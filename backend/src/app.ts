import express from 'express';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import config from './config';
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointment.routes';
import doctorRoutes from './routes/doctor.routes';
import scheduleRoutes from './routes/schedule.routes';
import clinicalRoutes from './routes/clinical.routes';
import notificationRoutes from './routes/notification.routes';
import specializationRoutes from './routes/specialization.routes';
import adminRoutes from './routes/admin.routes';
import { generalLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(hpp());
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(generalLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'medicare-connect-api', status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/clinical', clinicalRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/specializations', specializationRoutes);
app.use('/api/admin', adminRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;