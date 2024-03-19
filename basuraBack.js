await User.create({
    name: 'Mary Read',
    addresses: [
      {
        city: 'Nassau',
        country: 'Bahamas',
      },
      {
        city: 'London',
        country: 'England',
      }
    ],
  }, {
    include: ['addresses'],
  })