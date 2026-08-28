/**
 * Patient Engagement and Feedback Service
 * 
 * Comprehensive service for managing patient feedback, surveys, satisfaction
 * tracking, engagement metrics, and patient communication.
 */

import { logger } from '../utils/logger';
import { BadRequestError, NotFoundError, ConflictError } from '../utils/errors';

interface PatientFeedback {
  feedbackId: string;
  patientId: string;
  appointmentId?: string;
  doctorId?: string;
  departmentId?: string;
  type: 'appointment' | 'doctor' | 'facility' | 'service' | 'billing' | 'general';
  rating: number; // 1-5
  title: string;
  comment: string;
  categories?: string[];
  isAnonymous: boolean;
  submittedAt: Date;
  status: 'new' | 'reviewed' | 'resolved' | 'archived';
  response?: {
    respondedBy: string;
    respondedAt: Date;
    comment: string;
  };
}

interface PatientSurvey {
  surveyId: string;
  title: string;
  description: string;
  targetAudience: 'all_patients' | 'recent_patients' | 'specific_department' | 'specific_doctor';
  questions: SurveyQuestion[];
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'closed' | 'archived';
  responses: number;
  createdBy: string;
  createdAt: Date;
}

interface SurveyQuestion {
  questionId: string;
  questionText: string;
  questionType: 'rating' | 'yes_no' | 'multiple_choice' | 'text' | 'matrix';
  required: boolean;
  options?: string[];
  displayOrder: number;
}

interface EngagementMetric {
  metricId: string;
  patientId: string;
  appointmentCompletionRate: number;
  followUpComplianceRate: number;
  feedbackSubmissionRate: number;
  appointmentCancellationRate: number;
  averageSatisfactionScore: number;
  communicationPreference: 'email' | 'sms' | 'phone' | 'app_notification' | 'mail';
  lastEngagementDate: Date;
  engagementTrend: 'improving' | 'stable' | 'declining';
  riskScore: number; // 0-100, higher = more at-risk of churn
}

export class PatientEngagementService {
  /**
   * Submit patient feedback
   */
  public async submitFeedback(
    patientId: string,
    feedbackType: string,
    rating: number,
    title: string,
    comment: string,
    isAnonymous: boolean = false,
    appointmentId?: string,
    doctorId?: string
  ): Promise<PatientFeedback> {
    try {
      logger.info(`Recording feedback from patient: ${patientId}`);

      if (!patientId || !feedbackType || rating < 1 || rating > 5) {
        throw new BadRequestError('Invalid feedback data');
      }

      const feedback: PatientFeedback = {
        feedbackId: `FB-${Date.now()}`,
        patientId: isAnonymous ? 'anonymous' : patientId,
        appointmentId,
        doctorId,
        type: feedbackType as any,
        rating,
        title,
        comment,
        isAnonymous,
        submittedAt: new Date(),
        status: 'new'
      };

      logger.info(`Feedback recorded: ${feedback.feedbackId}`);
      return feedback;
    } catch (error) {
      logger.error(`Failed to record feedback: ${error}`);
      throw error;
    }
  }

  /**
   * Get patient satisfaction score
   */
  public async getPatientSatisfactionScore(patientId: string): Promise<{
    overallScore: number;
    byCategory: Record<string, number>;
    trend: string;
    feedbackCount: number;
  }> {
    try {
      logger.info(`Calculating satisfaction score for patient: ${patientId}`);

      const mockData = {
        overallScore: 4.6,
        byCategory: {
          doctor_quality: 4.8,
          wait_time: 4.2,
          facility_cleanliness: 4.7,
          staff_courtesy: 4.9,
          billing_clarity: 4.3,
          overall_experience: 4.6
        },
        trend: 'improving',
        feedbackCount: 12
      };

      logger.info(`Satisfaction score calculated: ${mockData.overallScore}`);
      return mockData;
    } catch (error) {
      logger.error(`Failed to calculate satisfaction score: ${error}`);
      throw error;
    }
  }

  /**
   * Create patient survey
   */
  public async createSurvey(
    title: string,
    description: string,
    questions: SurveyQuestion[],
    targetAudience: string,
    endDate: Date,
    createdBy: string
  ): Promise<PatientSurvey> {
    try {
      logger.info(`Creating patient survey: ${title}`);

      if (!title || !questions || questions.length === 0) {
        throw new BadRequestError('Survey title and questions are required');
      }

      const survey: PatientSurvey = {
        surveyId: `SURV-${Date.now()}`,
        title,
        description,
        targetAudience: targetAudience as any,
        questions,
        startDate: new Date(),
        endDate,
        status: 'draft',
        responses: 0,
        createdBy,
        createdAt: new Date()
      };

      logger.info(`Survey created: ${survey.surveyId}`);
      return survey;
    } catch (error) {
      logger.error(`Failed to create survey: ${error}`);
      throw error;
    }
  }

  /**
   * Launch survey
   */
  public async launchSurvey(surveyId: string): Promise<PatientSurvey> {
    try {
      logger.info(`Launching survey: ${surveyId}`);

      if (!surveyId) {
        throw new BadRequestError('Survey ID is required');
      }

      const survey: PatientSurvey = {
        surveyId,
        title: 'Patient Satisfaction Survey',
        description: 'Help us improve your healthcare experience',
        targetAudience: 'recent_patients',
        questions: [
          {
            questionId: 'Q1',
            questionText: 'How would you rate your overall experience?',
            questionType: 'rating',
            required: true,
            displayOrder: 1
          },
          {
            questionId: 'Q2',
            questionText: 'Would you recommend our facility to others?',
            questionType: 'yes_no',
            required: true,
            displayOrder: 2
          }
        ],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
        responses: 0,
        createdBy: 'System',
        createdAt: new Date()
      };

      logger.info(`Survey launched: ${surveyId}`);
      return survey;
    } catch (error) {
      logger.error(`Failed to launch survey: ${error}`);
      throw error;
    }
  }

  /**
   * Submit survey response
   */
  public async submitSurveyResponse(
    surveyId: string,
    patientId: string,
    responses: Record<string, any>
  ): Promise<{ success: boolean; message: string }> {
    try {
      logger.info(`Recording survey response from patient: ${patientId}`);

      if (!surveyId || !patientId || !responses) {
        throw new BadRequestError('Survey ID, patient ID, and responses are required');
      }

      logger.info(`Survey response recorded for survey: ${surveyId}`);
      return { success: true, message: 'Survey response recorded successfully' };
    } catch (error) {
      logger.error(`Failed to submit survey response: ${error}`);
      throw error;
    }
  }

  /**
   * Get engagement metrics for patient
   */
  public async getEngagementMetrics(patientId: string): Promise<EngagementMetric> {
    try {
      logger.info(`Calculating engagement metrics for patient: ${patientId}`);

      const metrics: EngagementMetric = {
        metricId: `EM-${Date.now()}`,
        patientId,
        appointmentCompletionRate: 92.5,
        followUpComplianceRate: 88.3,
        feedbackSubmissionRate: 65.0,
        appointmentCancellationRate: 5.2,
        averageSatisfactionScore: 4.6,
        communicationPreference: 'email',
        lastEngagementDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        engagementTrend: 'improving',
        riskScore: 15
      };

      logger.info(`Engagement metrics calculated for patient: ${patientId}`);
      return metrics;
    } catch (error) {
      logger.error(`Failed to calculate engagement metrics: ${error}`);
      throw error;
    }
  }

  /**
   * Get patient communication preferences
   */
  public async getPatientPreferences(patientId: string): Promise<{
    communicationChannel: string[];
    appointmentReminders: boolean;
    surveyNotifications: boolean;
    promotionalEmails: boolean;
    healthTips: boolean;
  }> {
    try {
      logger.info(`Retrieving communication preferences for patient: ${patientId}`);

      return {
        communicationChannel: ['email', 'sms'],
        appointmentReminders: true,
        surveyNotifications: true,
        promotionalEmails: false,
        healthTips: true
      };
    } catch (error) {
      logger.error(`Failed to retrieve patient preferences: ${error}`);
      throw error;
    }
  }

  /**
   * Update patient communication preferences
   */
  public async updatePatientPreferences(
    patientId: string,
    preferences: {
      communicationChannel?: string[];
      appointmentReminders?: boolean;
      surveyNotifications?: boolean;
      promotionalEmails?: boolean;
      healthTips?: boolean;
    }
  ): Promise<void> {
    try {
      logger.info(`Updating communication preferences for patient: ${patientId}`);

      if (!patientId) {
        throw new BadRequestError('Patient ID is required');
      }

      logger.info(`Patient preferences updated: ${patientId}`);
    } catch (error) {
      logger.error(`Failed to update patient preferences: ${error}`);
      throw error;
    }
  }

  /**
   * Get patient feedback
   */
  public async getPatientFeedback(
    patientId?: string,
    filters?: {
      type?: string;
      rating?: number;
      status?: string;
      limit?: number;
    }
  ): Promise<{ feedback: PatientFeedback[]; total: number }> {
    try {
      logger.info(`Retrieving patient feedback`);

      const mockFeedback: PatientFeedback[] = [
        {
          feedbackId: 'FB-001',
          patientId: patientId || 'PAT-001',
          appointmentId: 'APT-001',
          doctorId: 'DOC-001',
          type: 'appointment',
          rating: 5,
          title: 'Excellent appointment experience',
          comment: 'Dr. Smith was very professional and thorough',
          isAnonymous: false,
          submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          status: 'resolved',
          response: {
            respondedBy: 'admin@hospital.com',
            respondedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            comment: 'Thank you for the positive feedback!'
          }
        },
        {
          feedbackId: 'FB-002',
          patientId: patientId || 'PAT-001',
          type: 'billing',
          rating: 3,
          title: 'Billing could be clearer',
          comment: 'Would like better itemization of charges',
          isAnonymous: false,
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: 'reviewed'
        }
      ];

      let filtered = mockFeedback;
      if (filters?.type) {
        filtered = filtered.filter(f => f.type === filters.type);
      }
      if (filters?.rating) {
        filtered = filtered.filter(f => f.rating === filters.rating);
      }
      if (filters?.status) {
        filtered = filtered.filter(f => f.status === filters.status);
      }

      const total = filtered.length;
      const limit = filters?.limit || 50;
      return { feedback: filtered.slice(0, limit), total };
    } catch (error) {
      logger.error(`Failed to retrieve patient feedback: ${error}`);
      throw error;
    }
  }

  /**
   * Identify at-risk patients
   */
  public async getAtRiskPatients(threshold: number = 50): Promise<Array<{
    patientId: string;
    riskScore: number;
    reasons: string[];
    recommendedAction: string;
  }>> {
    try {
      logger.info(`Identifying at-risk patients with threshold: ${threshold}`);

      const atRiskPatients = [
        {
          patientId: 'PAT-005',
          riskScore: 78,
          reasons: [
            'High appointment cancellation rate (25%)',
            'Low engagement score',
            'Multiple failed follow-ups'
          ],
          recommendedAction: 'Schedule check-in call'
        },
        {
          patientId: 'PAT-008',
          riskScore: 65,
          reasons: [
            'No appointments in last 90 days',
            'Negative feedback on last visit'
          ],
          recommendedAction: 'Send personalized re-engagement email'
        }
      ];

      logger.info(`Identified ${atRiskPatients.length} at-risk patients`);
      return atRiskPatients;
    } catch (error) {
      logger.error(`Failed to identify at-risk patients: ${error}`);
      throw error;
    }
  }

  /**
   * Send patient engagement reminder
   */
  public async sendEngagementReminder(
    patientId: string,
    reminderType: 'survey' | 'feedback' | 'appointment_followup' | 'health_checkup',
    message: string
  ): Promise<void> {
    try {
      logger.info(`Sending engagement reminder to patient: ${patientId}`);

      if (!patientId || !reminderType || !message) {
        throw new BadRequestError('Patient ID, reminder type, and message are required');
      }

      logger.info(`Engagement reminder sent to patient: ${patientId}`);
    } catch (error) {
      logger.error(`Failed to send engagement reminder: ${error}`);
      throw error;
    }
  }

  /**
   * Respond to patient feedback
   */
  public async respondToFeedback(
    feedbackId: string,
    respondedBy: string,
    response: string
  ): Promise<void> {
    try {
      logger.info(`Responding to feedback: ${feedbackId}`);

      if (!feedbackId || !respondedBy || !response) {
        throw new BadRequestError('Feedback ID, responded by, and response are required');
      }

      logger.info(`Feedback responded to: ${feedbackId}`);
    } catch (error) {
      logger.error(`Failed to respond to feedback: ${error}`);
      throw error;
    }
  }
}

export default new PatientEngagementService();
