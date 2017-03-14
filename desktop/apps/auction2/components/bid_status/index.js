import { default as React, PropTypes } from 'react';

export default function BidStatus({ saleArtwork }) {
  let bidLabel
  if (saleArtwork.counts && saleArtwork.counts.bidder_positions > 0) {
    const bidOrBids = saleArtwork.counts.bidder_positions > 1 ? 'Bids' : 'Bid'
    bidLabel = `(${saleArtwork.counts.bidder_positions} ${bidOrBids})`
  } else {
    bidLabel = ''
  }

  return (
    <div className='auction2-bid-status'>
      <span className='auction2-bid-status__bid-amount'>{ saleArtwork.current_bid.display }</span>
      <span className='auction2-bid-status__bid-label'>{ bidLabel }</span>
    </div>
  );
}
