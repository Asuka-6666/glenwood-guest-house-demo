window.siteConfig = Object.freeze({
  demoMode: true,
  property: {
    name: 'Glenwood',
    subtitle: 'Guest House · Betws-y-Coed',
    hosts: ['Marie', 'Sid'],
    phoneDisplay: '01690 710508',
    phoneHref: 'tel:+441690710508',
    address: 'Glenwood Guest House, Holyhead Road, Betws-y-Coed, Conwy, LL24 0BN'
  },
  links: {
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=Glenwood+Guest+House+Betws-y-Coed&hl=en',
    bookingReviews: 'https://www.booking.com/hotel/gb/glenwood-guest-house.en-gb.html',
    googleReviews: 'https://www.google.com/maps/search/?api=1&query=Glenwood+Guest+House+Betws-y-Coed&hl=en'
  },
  booking: {
    mode: 'demo',
    provider: null,
    liveUrl: null,
    approvedFallbackUrl: null
  },
  reviews: {
    booking: {
      score: '9.4', scale: '10', count: 294, label: 'Rated superb on Booking.com',
      quote: 'The hosts were so lovely. The breakfast was gorgeous and the room had a lovely view.',
      quoteSource: 'Verified guest review · June 2026'
    },
    google: {
      score: null, count: null,
      entries: [
        { initial: 'L', tone: 'blue', name: 'Lisa P.', date: 'May 2025', stars: 5, text: 'Comfortable rooms and hearty breakfast. They even let us leave our car while we explored Betws-y-Coed.' },
        { initial: 'C', tone: 'green', name: 'Chellammal S.', date: 'August 2025', stars: 5, text: 'Beautiful location, comfortable rooms and a hearty breakfast. Family friendly and safe.' }
      ]
    }
  },
  rooms: {
    double: {
      name: 'Double Room', capacity: 2, bed: 'Double bed', bathroom: 'Private en-suite',
      summary: 'A comfortable base for two after a day in the mountains.',
      images: [
        ['image/official-website/glenwood-guesthouse-2026-room4-01-double-efc9837bf7.jpg', 'Glenwood Double Room'],
        ['image/official-website/glenwood-guesthouse-2026-room4-02-bathroom-054cffbf85.jpg', 'Double Room en-suite bathroom']
      ]
    },
    twin: {
      name: 'Twin Room', capacity: 2, bed: 'Twin beds or super king by request', bathroom: 'Private en-suite',
      summary: 'Flexible beds with an outlook over the rear garden.',
      images: [
        ['image/official-website/glenwood-guesthouse-2026-room3-01-twin-02-879f5ee859.jpg', 'Glenwood Twin Room'],
        ['image/official-website/2023-glenwood-room-3-twin-459acb064e.jpg', 'Alternative view of the Twin Room']
      ]
    },
    family: {
      name: 'Family Suite', capacity: 5, bed: 'King-size bed and adjoining room with three single beds', bathroom: 'Spacious private en-suite',
      summary: 'Connected sleeping areas for a family stay on the ground floor.',
      images: [
        ['image/official-website/glenwood-guesthouse-2026-room7-01-family-suite-ce5cdf52e9.jpg', 'Glenwood Family Suite'],
        ['image/official-website/glenwood-guesthouse-2026-room7-02-bathroom-67a2c09baa.jpg', 'Family Suite bathroom']
      ]
    }
  },
  faq: [
    ['Is private parking available?', 'Yes. Glenwood has extensive level private parking within the grounds.'],
    ['How far is the village?', 'Betws-y-Coed village centre is around a six-minute walk from the guest house.'],
    ['Which room works for families?', 'The Family Suite sleeps up to five guests, with a king-size room connected to a separate three-bed sleeping area.'],
    ['Is breakfast available?', 'Please check the booking details or call Glenwood for the latest breakfast information.'],
    ['How does online booking work?', 'Choose your dates on the website to view suitable rooms. The finished website will connect to Glenwood’s existing live booking provider to confirm availability and complete the reservation.'],
    ['Can I book by phone?', 'Yes. Call 01690 710508 to discuss dates, family stays or the Glenwood Garden Cottage.']
  ],
  ownerConfirmationRequired: [
    'booking.provider', 'booking.liveUrl', 'reviews.google.score', 'reviews.google.count',
    'breakfast inclusion and times', 'check-in and check-out times', 'cancellation policy',
    'minimum stay', 'child policy', 'pet policy', 'accessibility information'
  ]
});
