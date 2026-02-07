-- database PostgreSQL

// MongoDB queries

db.employees.find({});

db.employees.find({ name: 'Tom' });

db.companies.findOne(
    { _id: 1 },
    {
        projection: {
            userId: 1,
            name: 1,
            // ... other fields
        }
    }
).then(company => {
    return db.users.findOne(
        { _id: company.userId },
        { projection: { name: 1 } }
    ).then(user => {
        return { ...company, userName: user.name };
    });
});
