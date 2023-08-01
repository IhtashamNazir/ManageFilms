/* eslint-disable prettier/prettier */
export const SERVICE = 'USER_SERVICE';
export const MESSAGE_PATTERNS = {};
export const INJECT_MODELS = {};

export const SALTS = Number(process.env.PASSWORD_SALT);
export const SECRET_KEY = process.env.SECRET_KEY;
export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;

export const LOGGER = {};

export const RESPONSES = {
  SUCCESS: 'Success',
};

export enum STATUS {
  active = 'active',
  inactive = 'inactive',
  none = 'none',
}

export enum STATUSES {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED',
  FAILED = 'FAILED',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
  PARTIALLY = 'PARTIALLY',
  INPROCESS = 'INPROCESS',
  SIGNEDOFF = 'SIGNEDOFF',
  ACCEPTED = 'ACCEPTED',
  BOOKED = 'BOOKED',
  CANCELED = 'CANCELED',
}

export enum SHIFT_TYPE {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  LONGDAY = 'LONGDAY',
  NIGHT = 'NIGHT',
}

export enum ARRIVAL {
  NOT_TAKEN = 'NOT_TAKEN',
  EARLY = 'EARLY',
  ON_TIME = 'ON_TIME',
  LATE = 'LATE',
}

export const DEFAULT_PREFERENCES = {};

export const adminPermissions = [
  {
    name: 'dashboard',
    types: [
      'view',
      'edit',
      // 'shifts_widget',
      // 'timesheet_widget',
      // 'invoice_widget',
      // 'shifts_comprehension_widget',
      // 'top_candidates_widget',
      // 'today_birthday_widget',
      // 'recruitment_widget',
      // 'staff_widget',
      // 'client_widget',
      // 'shift_status_widget',
    ],
  },
  {
    name: 'client_manager',
    types: ['view', 'edit'],
  },
  {
    name: 'onboarding',
    types: [
      'view',
      'edit',
      // 'carer',
      // 'care_coordinator',
      // 'training_instructor',
      // 'client_manager',
      // 'add_new_client',
      // 'create_group ',
    ],
  },
  {
    name: 'staff_manager',
    types: [
      'view',
      'edit',
      // 'staff_count_widgets',
      // 'view_details',
      // 'view_profile',
      // 'staff_summary',
      // 'send_email_admin_amazon_ses',
      // 'allocate_staff',
      // 'delete_staff',
    ],
  },
  {
    name: 'staff_allocation',
    types: [
      'view',
      'edit',
      // 'staff_allocation_grid_view',
      // 'allocate_multiple_staff',
      // 'remove_multiple_staff',
      // 'profile_preview',
    ],
  },
  {
    name: 'staff_booking',
    types: [
      'view',
      'edit',
      // 'upcoming_shifts', 'completed_shifts', 'work_history'
    ],
  },
  {
    name: 'booking_calendar',
    types: [
      'view',
      'edit',
      // 'booking_calender', 'timesheet_calender', 'time_and_attendance'
    ],
  },
  {
    name: 'shift_manager',
    types: [
      'view',
      'edit',
      // '7_days_shift_booking_status', 'shift_details_carer'
    ],
  },
  {
    name: 'unpublished_shift',
    types: [
      'view',
      'edit',
      // 'shift_detail', 'action'
    ],
  },
  {
    name: 'finance',
    types: [
      'view',
      'edit',
      // 'finance_dashboard',
      // 'account_receivable_widget',
      // 'current',
      // 'due',
      // 'overdue',
      // 'revenue_comparison_widget',
      // 'clients_wise_avg_profit_widget',
      // 'staff_categories_widget',
      // 'week_wise_shift_hours_summary_widget',
      // 'top_clients_widget',
      // 'week_wise_clients_profit_widget',
      // 'setup',
      // 'client_rate_setup',
      // 'staff_rate_setup',
      // 'staff_code_setup',
      // 'invoices',
      // 'care_coordinators',
      // 'staff_payment_details',
      // 'staff_payment_history',
      // 'client_payment_details',
      // 'pending_payment_details',
      // 'reports',
      // 'staff_hours_report',
      // 'ni_payment',
      // 'non-ni_payment',
      // 'limited',
      // 'week_wise_report',
    ],
  },
  {
    name: 'reports',
    types: [
      'view',
      'edit',
      // 'staff_report_widget',
      // 'extra_hours_report_widget',
      // 'staff_attendance_widget',
      // 'client_work_widget',
      // 'staff_work_widget',
      // 'gross_profit_and_loss_widget',
      // 'activity_report_widget',
      // 'staff_availability',
      // 'shift_rate_settings',
      // 'shift_booking_report',
      // 'terminated_staff',
      // 'staff_shift_hours',
      // 'staff_cmopliance_widget',
      // 'payment_data_widget',
      // 'vaccination_report_widget',
      // 'shift_cancelled',
      // 'shift_booked_report_widget',
      // 'staff_data',
      // 'daily_shift',
      // 'shift_booking',
    ],
  },
  {
    name: 'help',
    types: [
      'assign_to',
      'status',
      // 'all_tickets_widget',
      // 'pending_tickets_widget',
      // 'onhold_tickets_widget',
      // 'resolved_tickets_widget',
      // 'closed_tickets_widget',
      // 'task_summary_widget',
      // 'my_ticket_detail_widget',
    ],
  },
  {
    name: 'settings',
    types: [
      'view',
      'edit',
      // 'key_info',
      // 'job_role',
      // 'shift_time_setting',
      // 'staff_setting',
      // 'bank_holiday',
      // 'dbs_configuration',
      // 'email_notification',
      // 'staff_tc',
      // 'agency_tc',
      // 'reset_email_phone',
      // 'week_start_day',
      // 'festival_day_greeting',
      // 'break_time_setting',
    ],
  },
];

export const carerPermissions = [
  {
    name: 'dashboard',
    types: [
      'view',
      'edit',
      // 'experience_widget',
      // 'upcoming_shifts_widget',
      // 'available_shifts_widget',
      // 'last_shift_details_widget',
      // 'overall_rating_widget',
      // 'document_expiry_dates_widget',
      // 'calendar_widget',
      // 'accomplishment_widget',
      // 'skills_widget',
      // 'request_widget',
      // 'check_in_clock',
    ],
  },
  {
    name: 'profile',
    types: ['view', 'edit'],
  },
  // {
  //   name: 'finance',
  //   types: ['reports', 'staff_hours_report', 'week_wise_report'],
  // },
  {
    name: 'shift_details',
    types: ['view', 'edit'],
  },
  {
    name: 'my_calendar',
    types: ['view', 'edit'],
  },
  {
    name: 'training',
    types: [
      'view',
      'edit',
      // 'mandatory_courses',
      // 'most_popular_courses',
      // 'optional_courses',
      // 'view_course',
      // 'course_completion_progress',
      // 'trainee_services',
      // 'my_notes',
      // 'my_results',
      // 'my_courses',
      // 'news_and_activity',
      // 'view_optional_courses',
    ],
  },
  {
    name: 'reports',
    types: [
      'view',
      'edit',
      // 'staff_attendance_widget',
      // 'payment_data_widget',
      // 'vaccination_report_widget',
      // 'shift_booking',
      // 'carer_requests',
      // 'whistle_blowing',
      // 'incident_report',
      // 'rating_report',
    ],
  },
  {
    name: 'help',
    types: [
      'view',
      'edit',
      // 'all_tickets_widget',
      // 'pending_tickets_widget',
      // 'onhold_tickets_widget',
      // 'resolved_tickets_widget',
      // 'closed_tickets_widget',
      // 'task_summary_widget',
      // 'my_ticket_detail_widget',
    ],
  },
  {
    name: 'ratings',
    type: [
      'view',
      'edit',
      // 'overall_ratings'
    ],
  },
];

export const careCoordinatorPermissions = [
  {
    name: 'dashboard',
    types: [
      'view',
      'edit',
      // 'calendar_widget',
      // 'carer_status_widget',
      // 'shift_requests_widget',
      // 'shift_booking',
      // 'whistle_blowing_widget',
      // 'shifts_requested_by_care_homes',
      // 'shift_insight_widget',
      // 'top_rated_carer',
    ],
  },
  {
    name: 'staff_allocation',
    types: [
      'view',
      'edit',
      // 'staff_allocation_grid_view',
      // 'allocate_multiple_staff',
      // 'remove_multiple_staff',
      // 'profile_preview',
    ],
  },
  {
    name: 'profile',
    types: ['view', 'edit'],
  },
  {
    name: 'booking_calendar',
    types: [
      'view',
      'edit',
      // 'booking_calender', 'timesheet_calender', 'time_and_attendance'
    ],
  },
  {
    name: 'manage_shift',
    types: [
      'view',
      'edit',
      // '7_days_shift_booking_status', 'shift_details_carer'
    ],
  },
  {
    name: 'finance',
    types: [
      'view',
      'edit',
      // 'finance_dashboard',
      // 'account_receivable_widget',
      // 'revenue_comparison_widget',
      // 'clients_wise_avg_profit_widget',
      // 'staff_categories_widget',
      // 'top_clients_widget',
      // 'week_wise_clients_profit_widget',
      // 'invoices',
      // 'care_coordinators',
      // 'staff_payment_details',
      // 'staff_payment_history',
      // 'client_payment_details',
      // 'pending_payment_details',
      // 'reports',
      // 'staff_hours_report',
      // 'ni_payment',
      // 'limited',
      // 'week_wise_report',
      // 'contract_payment',
    ],
  },
  {
    name: 'training',
    types: [
      'view',
      'edit',
      // 'mandatory_courses',
      // 'most_popular_courses',
      // 'optional_courses',
      // 'view_course',
      // 'carer_training',
      // 'view_detail',
      // 'course_completion_progress',
      // 'trainee_services',
      // 'my_notes',
      // 'my_results',
      // 'my_courses',
      // 'news_and_activity',
      // 'view_optional_courses',
      // 'carer_training_progress',
      // 'self_madatory_course',
    ],
  },
  {
    name: 'reports',
    types: [
      'view',
      'edit',
      // 'staff_report_widget',
      // 'extra_hours_report_widget',
      // 'staff_attendance_widget',
      // 'client_work_widget',
      // 'staff_work_widget',
      // 'activity_report_widget',
      // 'staff_availability',
      // 'shift_rate_settings',
      // 'shift_booking_report',
      // 'staff_shift_hours',
      // 'staff_cmopliance_widget',
      // 'vaccination_report_widget',
      // 'shift_cancelled',
      // 'shift_booked_report_widget',
      // 'staff_data',
      // 'daily_shift',
      // 'shift_booking',
      // 'whistle_blowing',
      // 'incident_report',
      // 'rating_report',
    ],
  },
  {
    name: 'help',
    types: [
      'view',
      'edit',
      // 'all_tickets_widget',
      // 'pending_tickets_widget',
      // 'onhold_tickets_widget',
      // 'resolved_tickets_widget',
      // 'closed_tickets_widget',
      // 'task_summary_widget',
      // 'my_ticket_detail_widget',
    ],
  },
  {
    name: 'settings',
    types: [
      'view',
      'edit',
      // 'job_role',
      // 'staff_tc',
      // 'reset_email_phone',
      // 'week_start_day',
      // 'break_time_setting',
    ],
  },
];

export const clientPermissions = [
  {
    name: 'dashboard',
    types: [
      'view',
      'edit',
      // 'upcoming_shifts_widget',
      // 'available_shifts_widget',
      // 'last_shift_details_widget',
      // 'overall_rating_widget',
      // 'calendar_widget',
      // 'canceled_shift_widget',
      // 'carer_per_month_widget',
      // 'recent_reviews_widget',
    ],
  },
  {
    name: 'profile',
    types: ['view', 'edit'],
  },
  {
    name: 'booking_calendar',
    types: [
      'view',
      'edit',
      // 'booking_calender'
    ],
  },
  {
    name: 'manage_shift',
    types: ['view', 'edit'],
  },
  {
    name: 'user_management',
    types: ['view', 'edit'],
  },
  {
    name: 'preferences',
    types: ['view', 'edit'],
  },
  {
    name: 'reports',
    types: [
      'view',
      'edit',
      // 'staff_report_widget',
      // 'extra_hours_report_widget',
      // 'staff_attendance_widget',
      // 'staff_work_widget',
      // 'shift_rate_settings',
      // 'staff_shift_hours',
      // 'vaccination_report_widget',
      // 'shift_cancelled',
      // 'daily_shift',
      // 'shift_booking',
      // 'financial_report',
      // 'activity_report',
    ],
  },
  {
    name: 'help',
    types: [
      'view',
      'edit',
      // 'all_tickets_widget',
      // 'pending_tickets_widget',
      // 'onhold_tickets_widget',
      // 'resolved_tickets_widget',
      // 'closed_tickets_widget',
      // 'task_summary_widget',
      // 'my_ticket_detail_widget',
      // 'high_priority_task_summary_widget',
    ],
  },
  {
    name: 'settings',
    types: [
      'view',
      'edit',
      // 'key_info',
      // 'job_role',
      // 'shift_time_setting',
      // 'bank_holiday',
      // 'reset_email_phone',
      // 'week_start_day',
      // 'festival_day_greeting',
      // 'break_time_setting',
      // 'electronic_attendance_monitoring',
    ],
  },
  {
    name: 'ratings',
    type: [
      'view',
      'edit',
      // 'overall_ratings'
    ],
  },
];

export const instructorPermissions = [
  {
    name: 'dashboard',
    types: [
      'view',
      'edit',
      // 'recent_activities_widget',
      // 'manage_course',
      // 'trainee_info',
      // 'webinar',
      // 'no_of_attendees_enrolled_in_per_month',
      // 'total_number_of_students',
    ],
  },
  {
    name: 'profile',
    types: ['view', 'edit'],
  },
  {
    name: 'manage_courses',
    types: ['view', 'edit'],
  },
  {
    name: 'trainee_info',
    types: ['view', 'edit'],
  },
  {
    name: 'webinar',
    types: ['view', 'edit'],
  },
  {
    name: 'reports',
    types: [
      'edit',
      'view',
      // 'activity_report',
      // 'trainee_info_report',
      // 'webinars_report',
      // 'certificate_report',
    ],
  },
  {
    name: 'help',
    types: [
      'view',
      'edit',
      // 'all_tickets_widget',
      // 'pending_tickets_widget',
      // 'onhold_tickets_widget',
      // 'resolved_tickets_widget',
      // 'closed_tickets_widget',
      // 'task_summary_widget',
      // 'my_ticket_detail_widget',
    ],
  },
];

export enum APPLICATION_TYPE {
  NEW = 'new_application',
  INTRO = 'intro_call_done',
  IN_PROGRESS = 'application_in_progress',
  VETTING_IN_PROGRESS = 'vetting_in_progress',
  AWAITING_REFERENCE = 'awaiting_reference',
  INTERVIEW_BOOKED = 'interview_booked',
  INTERVIEW_DONE = 'interview_done',
  TRAINING_TO_BE_COMPLETED = 'training_to_be_completed',
  TRAINING_COMPLETED = 'training_completed',
  INCOMPLETE_DOCUMENTS = 'incomplete_documents',
  DBS_TO_BE_COMPLETED = 'dbs_to_be_completed',
  NO_EXPERIENCE = 'no_experience',
  NOT_INTERESTED = 'not_interested',
}
