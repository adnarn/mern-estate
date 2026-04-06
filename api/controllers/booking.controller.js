import Booking from '../models/booking.model.js';
import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

// Create booking request
export const createBooking = async (req, res, next) => {
  try {
    const { listingId, message } = req.body;
    const userId = req.user.id;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }

    // Check if user is trying to book their own listing
    if (listing.userRef.toString() === userId) {
      return next(errorHandler(400, 'You cannot book your own listing'));
    }

    // Check if user already has a pending booking for this listing
    const existingBooking = await Booking.findOne({
      userId,
      listingId,
      status: 'pending'
    });

    if (existingBooking) {
      return next(errorHandler(400, 'You already have a pending booking for this listing'));
    }

    // Create booking
    const booking = new Booking({
      userId,
      listingId,
      message,
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// Get bookings made by logged-in user
export const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const bookings = await Booking.find({ userId })
      .populate('listingId', 'name address imageUrls regularPrice')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Get bookings for listings owned by user
export const getOwnerBookings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    // Get all listings owned by user
    const userListings = await Listing.find({ userRef: userId }).select('_id');
    const listingIds = userListings.map(listing => listing._id);

    // Get bookings for those listings
    const bookings = await Booking.find({ listingId: { $in: listingIds } })
      .populate('listingId', 'name address imageUrls regularPrice')
      .populate('userId', 'username email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// Update booking status (approve/reject)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!['approved', 'rejected'].includes(status)) {
      return next(errorHandler(400, 'Invalid status'));
    }

    // Find booking and populate listing to check ownership
    const booking = await Booking.findById(id).populate('listingId');
    
    if (!booking) {
      return next(errorHandler(404, 'Booking not found'));
    }

    // Check if user owns the listing
    if (booking.listingId.userRef.toString() !== userId) {
      return next(errorHandler(401, 'You can only update bookings for your listings'));
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Delete booking
export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find booking and populate listing to check ownership
    const booking = await Booking.findById(id).populate('listingId');
    
    if (!booking) {
      return next(errorHandler(404, 'Booking not found'));
    }

    // Check if user owns the booking or owns the listing
    const isBookingOwner = booking.userId.toString() === userId;
    const isListingOwner = booking.listingId.userRef.toString() === userId;

    if (!isBookingOwner && !isListingOwner) {
      return next(errorHandler(401, 'You can only delete your own bookings or booking requests for your listings'));
    }

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);
  }
};
