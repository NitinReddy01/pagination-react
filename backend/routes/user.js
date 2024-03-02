const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    res.send("hello");
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

router.post('/add-users', async (req, res) => {
    const users = shuffleArray(req.body.users);
    try {
        for (let user of users) {
            const { customer_name, age, phone, location, created_at } = user;
            await prisma.user.create({
                data: {
                    customer_name,
                    age,
                    phone,
                    location,
                    created_at
                }
            });
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

router.get('/users', async (req, res) => {
    const filter = req.query.filter || '';
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy==='true';
    let whereCondition;
    if (filter) {
        whereCondition = {
            OR: [
                { customer_name: { contains: filter, mode: 'insensitive' } },
                { location: { contains: filter, mode: 'insensitive' } }
            ]
        }
    }
    else {
        whereCondition = {};
    }
    try {
        let totalCount = await prisma.user.count({
            where:whereCondition
        })
        let users = await prisma.user.findMany({
            where: whereCondition,
            orderBy: sortBy ? { ["created_at"]: 'asc' } : undefined,
            skip: (page - 1) * 20,
            take: 20
        })
        users = users.map(user => {
            return {
                ...user,
                phone: user.phone.toString()
            };
        });
        res.send({ users, totalCount});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

let t = async () => {
    await prisma.user.deleteMany({
        where: {}
    })
}
// t();

module.exports = router;