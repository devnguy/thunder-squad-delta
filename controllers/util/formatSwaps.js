function formatSwaps(swaps) {
  return swaps.map((swap) => ({
    id: swap.swap_id,
    condition: swap.condition,
    status: swap.status,
    cost: swap.cost,
    creation_date: swap.creation_date,
    date_requested: swap.date_requested,
    shipping_cost: 500,
    owner: {
      id: swap.owner_id,
      name: swap.owner_name,
      street: swap.owner_street,
      city: swap.owner_city,
      state: swap.owner_state,
      zip: swap.owner_zip,
    },
    receiver: swap.receiver_id
      ? {
          id: swap.receiver_id,
          name: swap.receiver_name,
          street: swap.receiver_street,
          city: swap.receiver_city,
          state: swap.receiver_state,
          zip: swap.receiver_zip,
        }
      : null,
    book: {
      id: swap.book_id,
      title: swap.title,
      author: swap.author,
      genre: swap.genre,
      description: swap.description,
      year_published: swap.year_published,
      publisher: swap.publisher,
      image: swap.image,
    },
  }))
}

module.exports = formatSwaps
