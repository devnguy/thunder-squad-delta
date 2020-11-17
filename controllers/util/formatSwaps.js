function formatSwaps(swaps) {
  return swaps.map((swap) => ({
    id: swap.swap_id,
    condition: swap.condition,
    status: swap.status,
    cost: swap.cost,
    creation_date: swap.creation_date,
    owner: {
      id: swap.owner_id,
      name: swap.owner_name,
    },
    receiver: swap.receiver_id ? { id: swap.receiver_id, name: swap.receiver_name } : null,
    book: {
      id: swap.book_id,
      title: swap.title,
      author: swap.author,
      genre: swap.genre,
      description: swap.description,
      year_published: swap.year_published,
      publisher: swap.publisher,
    },
  }))
}

module.exports = formatSwaps
