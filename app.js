// app.js
import Joi from 'joi';
import express from 'express';
import { config } from 'dotenv';
import { sequelize } from './config/sequelize-config.js';
import User from './models/user.js';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
let count = 0;
const schema = Joi.object({
  userId: Joi.number().integer().required(),
  amount: Joi.number().integer().required(),
});

app.put('/updateBalance', async (req, res) => {
  const { userId, amount } = req.body;
  count++;
  // console.log(count);
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await sequelize.transaction(async (t) => {
      const newBalance = user.balance + amount;
      if (newBalance < 0) {
        throw new Error('Insufficient funds');
      }

      await user.update({ balance: newBalance }, { transaction: t });
    });

    res.status(200).json({ message: 'Balance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default app;
