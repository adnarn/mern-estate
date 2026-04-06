import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { 
  createBooking, 
  getUserBookings, 
  getOwnerBookings, 
  updateBookingStatus,
  deleteBooking 
} from '../controllers/booking.controller.js';

const router = express.Router();

// Create booking request
router.post('/', verifyToken, createBooking);

// Get bookings made by logged-in user
router.get('/user', verifyToken, getUserBookings);

// Get bookings for listings owned by user
router.get('/owner', verifyToken, getOwnerBookings);

// Update booking status
router.put('/:id', verifyToken, updateBookingStatus);

// Delete booking
router.delete('/:id', verifyToken, deleteBooking);

export default router;
