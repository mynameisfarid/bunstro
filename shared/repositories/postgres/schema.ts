import {
  pgTable,
  integer,
  smallint,
  bigint,
  serial,
  bigserial,
  varchar,
  char,
  text,
  boolean,
  numeric,
  real,
  doublePrecision,
  json,
  jsonb,
  date,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

export const active_admin_comments = pgTable('active_admin_comments', {
  id: integer('id').notNull().primaryKey(),
  namespace: varchar('namespace'),
  body: text('body'),
  resource_id: varchar('resource_id').notNull(),
  resource_type: varchar('resource_type').notNull(),
  author_id: integer('author_id'),
  author_type: varchar('author_type'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const activehash_benefits = pgTable('activehash_benefits', {
  id: integer('id').notNull().primaryKey(),
  benefit: varchar('benefit'),
})

export const activehash_degrees = pgTable('activehash_degrees', {
  id: integer('id').notNull().primaryKey(),
  degree: varchar('degree'),
})

export const activehash_job_levels = pgTable('activehash_job_levels', {
  id: integer('id').notNull().primaryKey(),
  job_level: varchar('job_level'),
})

export const activehash_job_types = pgTable('activehash_job_types', {
  id: integer('id').notNull().primaryKey(),
  job_type: varchar('job_type'),
})

export const activehash_relationships = pgTable('activehash_relationships', {
  id: integer('id').notNull().primaryKey(),
  relationship: varchar('relationship'),
})

export const activehash_skill_levels = pgTable('activehash_skill_levels', {
  id: integer('id').notNull().primaryKey(),
  skill_level: varchar('skill_level'),
})

export const ad_trackers = pgTable('ad_trackers', {
  id: integer('id').notNull().primaryKey(),
  ad_id: integer('ad_id'),
  user_id: integer('user_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const admin_authentications = pgTable('admin_authentications', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  admin_menu_id: integer('admin_menu_id'),
  created_by: integer('created_by'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const ads = pgTable('ads', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  image: varchar('image'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  url: varchar('url'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  category: varchar('category'),
  allow_multiple: boolean('allow_multiple'),
  clicks_count: integer('clicks_count'),
  event_label: varchar('event_label'),
})

export const apply_logs = pgTable('apply_logs', {
  id: integer('id').notNull(),
  ip: varchar('ip').notNull(),
  opportunity_id: integer('opportunity_id').notNull(),
  user_id: integer('user_id').notNull(),
  created_at: timestamp('created_at').notNull(),
  platform: varchar('platform').notNull(),
})

export const assessment_answers = pgTable('assessment_answers', {
  id: integer('id').notNull().primaryKey(),
  assessment_id: integer('assessment_id'),
  selected_opportunity_id: integer('selected_opportunity_id'),
  answer: jsonb('answer'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const assessments = pgTable('assessments', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  unique_id: varchar('unique_id'),
  question_text: varchar('question_text'),
  question_type: varchar('question_type'),
  description: varchar('description'),
  answer_options: jsonb('answer_options'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const attachments = pgTable('attachments', {
  id: integer('id').notNull().primaryKey(),
  document: varchar('document'),
  attachable_id: integer('attachable_id'),
  attachable_type: varchar('attachable_type'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  document_type: varchar('document_type'),
  priority: boolean('priority').notNull(),
  filesize: integer('filesize'),
})

export const audits = pgTable('audits', {
  id: integer('id').notNull().primaryKey(),
  auditable_id: integer('auditable_id'),
  auditable_type: varchar('auditable_type'),
  associated_id: integer('associated_id'),
  associated_type: varchar('associated_type'),
  user_id: integer('user_id'),
  user_type: varchar('user_type'),
  username: varchar('username'),
  action: varchar('action'),
  audited_changes: jsonb('audited_changes'),
  version: integer('version'),
  comment: varchar('comment'),
  remote_address: varchar('remote_address'),
  request_uuid: varchar('request_uuid'),
  created_at: timestamp('created_at'),
})

export const auto_apply_log = pgTable('auto_apply_log', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  created_at: date('created_at').notNull(),
  message: varchar('message').notNull(),
  log_type: varchar('log_type').notNull(),
})

export const awsdms_ddl_audit = pgTable('awsdms_ddl_audit', {
  c_key: bigint('c_key').notNull().primaryKey(),
  c_time: timestamp('c_time'),
  c_user: varchar('c_user'),
  c_txn: varchar('c_txn'),
  c_tag: varchar('c_tag'),
  c_oid: integer('c_oid'),
  c_name: varchar('c_name'),
  c_schema: varchar('c_schema'),
  c_ddlqry: text('c_ddlqry'),
})

export const billing_infos = pgTable('billing_infos', {
  id: integer('id').notNull().primaryKey(),
  order_id: integer('order_id'),
  user_id: integer('user_id'),
  name: varchar('name'),
  company_name: varchar('company_name'),
  cell_prefix: varchar('cell_prefix'),
  cell: varchar('cell'),
  website: varchar('website'),
  email: varchar('email'),
  location_id: integer('location_id'),
  address: varchar('address'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const branches = pgTable('branches', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  name: varchar('name'),
  description: varchar('description'),
  latitude: numeric('latitude'),
  longitude: numeric('longitude'),
  location_id: integer('location_id'),
  map_location_json: varchar('map_location_json'),
  is_default: boolean('is_default'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
  erika_id: integer('erika_id'),
})

export const candidate_notifications = pgTable('candidate_notifications', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  title: varchar('title'),
  content: varchar('content'),
  started_at: timestamp('started_at'),
  url: varchar('url'),
  read: boolean('read'),
  category: varchar('category'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  payload: json('payload'),
})

export const certifications = pgTable('certifications', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  position: integer('position'),
  name: varchar('name'),
  description: text('description'),
  issued_date: date('issued_date'),
  issued_by: varchar('issued_by'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  start_month: integer('start_month'),
  start_year: integer('start_year'),
  end_month: integer('end_month'),
  end_year: integer('end_year'),
  is_not_expired: boolean('is_not_expired'),
  attachment_id: integer('attachment_id'),
})

export const ckeditor_assets = pgTable('ckeditor_assets', {
  id: integer('id').notNull().primaryKey(),
  data_file_name: varchar('data_file_name').notNull(),
  data_content_type: varchar('data_content_type'),
  data_file_size: integer('data_file_size'),
  assetable_id: integer('assetable_id'),
  assetable_type: varchar('assetable_type'),
  type: varchar('type'),
  width: integer('width'),
  height: integer('height'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const client_codes = pgTable('client_codes', {
  id: integer('id').notNull().primaryKey(),
  client_name: varchar('client_name'),
  code: varchar('code'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const communication_test_informations = pgTable('communication_test_informations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  finished_at: timestamp('finished_at'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  category: varchar('category'),
})

export const communication_test_results = pgTable('communication_test_results', {
  id: integer('id').notNull().primaryKey(),
  communication_test_information_id: integer('communication_test_information_id'),
  communication_test_id: integer('communication_test_id'),
  answer: boolean('answer'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const companies = pgTable('companies', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  industry_id: integer('industry_id'),
  name: varchar('name'),
  address: varchar('address'),
  zip_code: varchar('zip_code'),
  location_id: integer('location_id'),
  phone: varchar('phone'),
  fax: varchar('fax'),
  website: varchar('website'),
  description: varchar('description'),
  billing_company_name: varchar('billing_company_name'),
  billing_contact_name: varchar('billing_contact_name'),
  billing_address: varchar('billing_address'),
  billing_zip_code: varchar('billing_zip_code'),
  npwp: varchar('npwp'),
  nppkp: varchar('nppkp'),
  tax_address: varchar('tax_address'),
  tax_zip_code: varchar('tax_zip_code'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  logo_filename: varchar('logo_filename'),
  opportunities_count: integer('opportunities_count'),
  featured: boolean('featured'),
  tagline: varchar('tagline'),
  start_working_day: integer('start_working_day'),
  end_working_day: integer('end_working_day'),
  start_working_time: text('start_working_time'),
  end_working_time: text('end_working_time'),
  career_reason: text('career_reason'),
  dress_code: varchar('dress_code'),
  company_size: varchar('company_size'),
  cover: varchar('cover'),
  map_location: text('map_location'),
  siup_number: integer('siup_number'),
  siup: varchar('siup'),
  erika_id: integer('erika_id'),
  urbanhire_company_id: varchar('urbanhire_company_id'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  syncable: boolean('syncable'),
  vision_mission: text('vision_mission'),
  video_url: varchar('video_url'),
  offline_token: varchar('offline_token'),
  rank_score: integer('rank_score'),
  enquiry_id: integer('enquiry_id'),
  company_group_size: integer('company_group_size'),
  business_scale: integer('business_scale'),
  business_field: integer('business_field'),
  category: integer('category'),
  is_excluded: boolean('is_excluded'),
  num_opportunities: smallint('num_opportunities').notNull(),
})

export const company_benefits = pgTable('company_benefits', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  benefit_id: integer('benefit_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const company_filters = pgTable('company_filters', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  industry: varchar('industry'),
  location: varchar('location'),
  sort_by: varchar('sort_by').notNull(),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const company_galleries = pgTable('company_galleries', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  description: text('description'),
  image: varchar('image'),
  company_id: integer('company_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  order: integer('order'),
})

export const company_hiring_opportunities = pgTable('company_hiring_opportunities', {
  id: integer('id').notNull().primaryKey(),
  company_hiring_id: integer('company_hiring_id'),
  opportunity_id: integer('opportunity_id'),
})

export const company_hiring_users = pgTable('company_hiring_users', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  company_hiring_id: integer('company_hiring_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  applied_at: timestamp('applied_at'),
  completed_at: timestamp('completed_at'),
  source: varchar('source'),
  status: varchar('status'),
  will_attend_at: timestamp('will_attend_at'),
  caller_user_id: integer('caller_user_id'),
  target_location_id: integer('target_location_id'),
  opportunity_id: integer('opportunity_id'),
})

export const company_hirings = pgTable('company_hirings', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  url: varchar('url'),
  is_active: boolean('is_active'),
  rules_id: integer('rules_id'),
})

export const company_users = pgTable('company_users', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  company_id: integer('company_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const cookie_emails = pgTable('cookie_emails', {
  id: integer('id').notNull().primaryKey(),
  client_id: varchar('client_id'),
  value: varchar('value'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  source: varchar('source'),
  completed_registration: boolean('completed_registration'),
})

export const cookie_jobs = pgTable('cookie_jobs', {
  id: integer('id').notNull().primaryKey(),
  client_id: varchar('client_id'),
  value: integer('value'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  referenced_count: integer('referenced_count'),
})

export const cookie_searches = pgTable('cookie_searches', {
  id: integer('id').notNull().primaryKey(),
  client_id: varchar('client_id'),
  value: json('value'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const cover_images = pgTable('cover_images', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  image: varchar('image'),
  url: varchar('url'),
  active: boolean('active'),
  clicks_count: integer('clicks_count'),
  event_label: varchar('event_label'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  is_mobile: boolean('is_mobile'),
  is_bbm: boolean('is_bbm'),
  is_employer: boolean('is_employer'),
  order: integer('order'),
  is_choice_opportunity: boolean('is_choice_opportunity'),
})

export const crp_caller_campaigns = pgTable('crp_caller_campaigns', {
  id: integer('id').notNull().primaryKey(),
  company_hiring_id: integer('company_hiring_id'),
  campaign: varchar('campaign'),
  location_ids: text('location_ids'),
  is_active: boolean('is_active'),
  held_at: timestamp('held_at'),
  venue: varchar('venue'),
})

export const crp_caller_users = pgTable('crp_caller_users', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  crp_caller_campaign_id: integer('crp_caller_campaign_id'),
})

export const crp_company_hiring_opportunity_locations = pgTable('crp_company_hiring_opportunity_locations', {
  id: integer('id').notNull().primaryKey(),
  company_hiring_id: integer('company_hiring_id'),
  opportunity_id: integer('opportunity_id'),
  location_id: integer('location_id'),
  location_campaign: varchar('location_campaign'),
  is_active: boolean('is_active'),
  detail_address: text('detail_address'),
})

export const custom_pages = pgTable('custom_pages', {
  id: integer('id').notNull().primaryKey(),
  keyword: varchar('keyword'),
  meta_title: varchar('meta_title'),
  meta_description: text('meta_description'),
  group: varchar('group'),
  redirect_path: varchar('redirect_path'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const editable_content_translations = pgTable('editable_content_translations', {
  id: integer('id').notNull().primaryKey(),
  editable_content_id: integer('editable_content_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  body: text('body'),
})

export const editable_contents = pgTable('editable_contents', {
  id: integer('id').notNull().primaryKey(),
  key: varchar('key'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  raw: boolean('raw'),
})

export const educations = pgTable('educations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  position: integer('position'),
  school_id: integer('school_id'),
  school_name: varchar('school_name'),
  start_year: integer('start_year'),
  end_year: integer('end_year'),
  degree_id: integer('degree_id'),
  major_id: integer('major_id'),
  gpa: varchar('gpa'),
  honors: text('honors'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  new_gpa: doublePrecision('new_gpa'),
  start_month: integer('start_month'),
  end_month: integer('end_month'),
  ijazah_id: integer('ijazah_id'),
  transkrip_id: integer('transkrip_id'),
  location_id: integer('location_id'),
  country_id: integer('country_id'),
  max_gpa: doublePrecision('max_gpa'),
})

export const efset_results = pgTable('efset_results', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  cefr: varchar('cefr'),
  score: varchar('score'),
  response: json('response'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  ef_levels: varchar('ef_levels'),
})

export const egtcs = pgTable('egtcs', {
  id: integer('id').notNull().primaryKey(),
  city: varchar('city'),
  university: varchar('university'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  map_location: text('map_location'),
  cover: varchar('cover'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  city_registration_code: varchar('city_registration_code'),
  private: boolean('private'),
})

export const enquiries = pgTable('enquiries', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  company_name: varchar('company_name'),
  email: varchar('email'),
  phone: varchar('phone'),
  location_id: integer('location_id'),
  address: varchar('address'),
  message: text('message'),
  category_ids: varchar('category_ids'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  company_group_size: integer('company_group_size'),
  package_id: integer('package_id'),
  position: varchar('position'),
  domain_name_expected: varchar('domain_name_expected'),
  npwp: varchar('npwp'),
  is_valid: boolean('is_valid'),
  business_scale: integer('business_scale'),
  business_field: integer('business_field'),
})

export const erika_user_notification = pgTable('erika_user_notification', {
  id: integer('id').notNull().primaryKey(),
  erika_user_id: integer('erika_user_id'),
  notifications_id: integer('notifications_id'),
  created_at: timestamp('created_at'),
})

export const event_opportunities = pgTable('event_opportunities', {
  event_id: integer('event_id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id').notNull(),
  active: boolean('active').notNull(),
})

export const events = pgTable('events', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  detail: text('detail'),
  quota: integer('quota'),
  date: date('date'),
  time: text('time'),
  egtc_id: integer('egtc_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  certificate: varchar('certificate'),
  certificate_conf: json('certificate_conf'),
  time_end: text('time_end'),
  show_detail: boolean('show_detail'),
  speaker_ids: text('speaker_ids'),
  order: integer('order'),
  image: varchar('image'),
  location: varchar('location'),
  type_id: integer('type_id'),
  date_end: date('date_end'),
})

export const expo_participant_companies = pgTable('expo_participant_companies', {
  id: integer('id').notNull().primaryKey(),
  expo_id: integer('expo_id'),
  participant_company_id: integer('participant_company_id'),
})

export const expos = pgTable('expos', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  utm_source: varchar('utm_source'),
  utm_medium: varchar('utm_medium'),
  utm_campaign: varchar('utm_campaign'),
  last_event: varchar('last_event'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  slug: varchar('slug'),
  address: varchar('address'),
  custom_field: json('custom_field'),
  floorplan: varchar('floorplan'),
  push_as_json: boolean('push_as_json'),
  ip_public: text('ip_public'),
  event_enable: boolean('event_enable'),
})

export const featured_company_on_cities = pgTable('featured_company_on_cities', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  location_id: integer('location_id'),
})

export const featured_company_on_industries = pgTable('featured_company_on_industries', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  group_industry_slug: varchar('group_industry_slug'),
})

export const fraud_reports = pgTable('fraud_reports', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  company_id: integer('company_id'),
  reason: integer('reason'),
  chronology: text('chronology'),
  image_urls: text('image_urls'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  type: varchar('type'),
})

export const highest_demand_by_industries = pgTable('highest_demand_by_industries', {
  id: integer('id').notNull().primaryKey(),
  job_function_id: integer('job_function_id'),
  group_industry: varchar('group_industry'),
  salary_lower: integer('salary_lower'),
  salary_upper: integer('salary_upper'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const highest_demand_job_functions = pgTable('highest_demand_job_functions', {
  id: integer('id').notNull().primaryKey(),
  job_function_id: integer('job_function_id'),
  location_id: integer('location_id'),
  salary_lower: integer('salary_lower'),
  salary_upper: integer('salary_upper'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const hiring_documents = pgTable('hiring_documents', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  notes: varchar('notes'),
  url: varchar('url'),
  user_source: varchar('user_source'),
  user_id: integer('user_id'),
  employee_id: integer('employee_id'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const identities = pgTable('identities', {
  id: integer('id').notNull().primaryKey(),
  uid: varchar('uid'),
  provider: varchar('provider'),
  user_id: integer('user_id'),
  raw_auth: varchar('raw_auth'),
})

export const intelligence_test_informations = pgTable('intelligence_test_informations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  finished_at: timestamp('finished_at'),
  attributes_score: integer('attributes_score'),
  relations_score: integer('relations_score'),
  category: varchar('category'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const intelligence_test_results = pgTable('intelligence_test_results', {
  id: integer('id').notNull().primaryKey(),
  intelligence_test_information_id: integer('intelligence_test_information_id'),
  intelligence_test_id: integer('intelligence_test_id'),
  answer: varchar('answer'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const interest_test_informations = pgTable('interest_test_informations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  finished_at: timestamp('finished_at'),
  score_1: numeric('score_1'),
  category_1: integer('category_1'),
  score_2: numeric('score_2'),
  category_2: integer('category_2'),
  score_3: numeric('score_3'),
  category_3: integer('category_3'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const interest_test_results = pgTable('interest_test_results', {
  id: integer('id').notNull().primaryKey(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  answer: integer('answer'),
  interest_test_id: integer('interest_test_id'),
  interest_test_information_id: integer('interest_test_information_id'),
})

export const interview_answers = pgTable('interview_answers', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  playlist_id: varchar('playlist_id'),
  attempt: integer('attempt'),
  jwplayer_playlist_id: varchar('jwplayer_playlist_id'),
})

export const interview_answers_items = pgTable('interview_answers_items', {
  id: integer('id').notNull().primaryKey(),
  interview_answer_id: integer('interview_answer_id'),
  interview_question_id: integer('interview_question_id'),
  youtube_id: varchar('youtube_id'),
  status: integer('status'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  jwplayer_id: varchar('jwplayer_id'),
  platform: varchar('platform'),
  interview_question_text: varchar('interview_question_text'),
  backup_url: varchar('backup_url'),
  video_s3: varchar('video_s3'),
})

export const interview_questions = pgTable('interview_questions', {
  id: integer('id').notNull().primaryKey(),
  question: varchar('question'),
  duration_in_seconds: integer('duration_in_seconds'),
  opportunity_id: integer('opportunity_id'),
})

export const invitations = pgTable('invitations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  type: varchar('type'),
  opportunity_id: integer('opportunity_id'),
})

export const invited_emails = pgTable('invited_emails', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  status: varchar('status'),
  destination_email: varchar('destination_email'),
  secret_key: varchar('secret_key'),
  subject: varchar('subject'),
  message: text('message'),
  sender_email: varchar('sender_email'),
  sender_name: varchar('sender_name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  platform: varchar('platform'),
})

export const job_alert_email_template_last_sents = pgTable('job_alert_email_template_last_sents', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  job_alert_email_template_id: integer('job_alert_email_template_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const job_alert_email_templates = pgTable('job_alert_email_templates', {
  id: integer('id').notNull().primaryKey(),
  subject: varchar('subject'),
  title: varchar('title'),
  content: text('content'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const job_alert_options = pgTable('job_alert_options', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  enable_alert: boolean('enable_alert'),
  job_function_ids: text('job_function_ids'),
})

export const jobs_recommendations = pgTable('jobs_recommendations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_ids: text('opportunity_ids'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const karirpedia = pgTable('karirpedia', {
  id: integer('id').notNull().primaryKey(),
  description: text('description'),
  location_id: integer('location_id'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const karirpedium_translations = pgTable('karirpedium_translations', {
  id: integer('id').notNull().primaryKey(),
  karirpedium_id: integer('karirpedium_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  description: text('description'),
})

export const language_proficiencies = pgTable('language_proficiencies', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  position: integer('position'),
  name: varchar('name'),
  spoken_skill_level_id: integer('spoken_skill_level_id'),
  written_skill_level_id: integer('written_skill_level_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  attachment_id: integer('attachment_id'),
})

export const log_alerts = pgTable('log_alerts', {
  opportunity_id: integer('opportunity_id').notNull(),
  user_id: integer('user_id').notNull(),
  campaign: varchar('campaign').notNull(),
  created_at: timestamp('created_at').notNull(),
})

export const mag_downloads = pgTable('mag_downloads', {
  id: integer('id').notNull().primaryKey(),
  mag_id: integer('mag_id'),
  downloader_id: integer('downloader_id'),
  downloader_type: varchar('downloader_type'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const mags = pgTable('mags', {
  id: integer('id').notNull().primaryKey(),
  title: varchar('title'),
  description: text('description'),
  special_edition: boolean('special_edition'),
  thumb: varchar('thumb'),
  file: varchar('file'),
  mag_downloads_count: integer('mag_downloads_count'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  published_date: date('published_date'),
  external_url: varchar('external_url'),
})

export const marked_users = pgTable('marked_users', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  employer_id: integer('employer_id'),
  user_id: integer('user_id'),
  created_at: timestamp('created_at').notNull(),
  gsource: varchar('gsource'),
  source: varchar('source'),
})

export const marketing_pages = pgTable('marketing_pages', {
  id: integer('id').notNull().primaryKey(),
  url_iframe: varchar('url_iframe'),
  height: integer('height'),
  url_on_karir: varchar('url_on_karir'),
})

export const master_admin_menus = pgTable('master_admin_menus', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
})

export const master_communication_tests = pgTable('master_communication_tests', {
  id: integer('id').notNull().primaryKey(),
  question_1: varchar('question_1'),
  question_2: varchar('question_2'),
})

export const master_company_type_translations = pgTable('master_company_type_translations', {
  id: integer('id').notNull().primaryKey(),
  master_company_type_id: integer('master_company_type_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const master_company_types = pgTable('master_company_types', {
  id: integer('id').notNull().primaryKey(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  code_name: varchar('code_name'),
})

export const master_countries = pgTable('master_countries', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
})

export const master_districts = pgTable('master_districts', {
  id: integer('id').notNull().primaryKey(),
  master_regency_id: integer('master_regency_id'),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  keywords: varchar('keywords'),
})

export const master_industries = pgTable('master_industries', {
  id: integer('id').notNull().primaryKey(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  active_opportunities_count: integer('active_opportunities_count'),
  linkedin_code: varchar('linkedin_code'),
  line_code: varchar('line_code'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  code_name: varchar('code_name'),
})

export const master_industry_translations = pgTable('master_industry_translations', {
  id: integer('id').notNull().primaryKey(),
  master_industry_id: integer('master_industry_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const master_intelligence_tests = pgTable('master_intelligence_tests', {
  id: integer('id').notNull().primaryKey(),
  aspect: integer('aspect'),
  part: integer('part'),
  level: integer('level'),
  code: varchar('code'),
  answer: varchar('answer'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const master_interest_tests = pgTable('master_interest_tests', {
  id: integer('id').notNull().primaryKey(),
  question: varchar('question'),
  interest_test_category_id: integer('interest_test_category_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  number: integer('number'),
})

export const master_job_categories = pgTable('master_job_categories', {
  id: integer('id').notNull().primaryKey(),
  master_job_ancestor_id: integer('master_job_ancestor_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  line_code: varchar('line_code'),
  code_name: varchar('code_name'),
})

export const master_job_category_translations = pgTable('master_job_category_translations', {
  id: integer('id').notNull().primaryKey(),
  master_job_category_id: integer('master_job_category_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
  ancestor_name: varchar('ancestor_name'),
})

export const master_job_function_groups = pgTable('master_job_function_groups', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  job_function_ids: text('job_function_ids'),
})

export const master_job_function_translations = pgTable('master_job_function_translations', {
  id: integer('id').notNull().primaryKey(),
  master_job_function_id: integer('master_job_function_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const master_job_functions = pgTable('master_job_functions', {
  id: integer('id').notNull().primaryKey(),
  master_job_category_id: integer('master_job_category_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  linkedin_code: varchar('linkedin_code'),
  line_code: text('line_code'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  code_name: varchar('code_name'),
  master_job_function_group_id: integer('master_job_function_group_id'),
})

export const master_job_titles = pgTable('master_job_titles', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name').notNull(),
  sub_function_id: integer('sub_function_id'),
  qriteria_id: integer('qriteria_id'),
})

export const master_location_translations = pgTable('master_location_translations', {
  id: integer('id').notNull().primaryKey(),
  master_location_id: integer('master_location_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const master_locations = pgTable('master_locations', {
  id: integer('id').notNull().primaryKey(),
  province_id: integer('province_id'),
  tm_location__n_province_id: integer('tm_location__n_province_id'),
  tm_location__n_location_id: integer('tm_location__n_location_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  line_code: text('line_code'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  code_name: varchar('code_name'),
  master_regency_id: integer('master_regency_id'),
  from_sql: boolean('from_sql'),
})

export const master_major_translations = pgTable('master_major_translations', {
  id: integer('id').notNull().primaryKey(),
  master_major_id: integer('master_major_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const master_majors = pgTable('master_majors', {
  id: integer('id').notNull().primaryKey(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  guid: text('guid'),
  gsource: varchar('gsource'),
  code_name: varchar('code_name'),
})

export const master_provinces = pgTable('master_provinces', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const master_regencies = pgTable('master_regencies', {
  id: integer('id').notNull().primaryKey(),
  master_province_id: integer('master_province_id'),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const master_salaries = pgTable('master_salaries', {
  id: integer('id').notNull().primaryKey(),
  lower: integer('lower'),
  upper: integer('upper'),
  active: boolean('active'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  middle: integer('middle'),
})

export const master_schools = pgTable('master_schools', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  location_id: integer('location_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  guid: text('guid'),
  gsource: varchar('gsource'),
  syncable: boolean('syncable'),
})

export const master_sub_functions = pgTable('master_sub_functions', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name').notNull(),
  function_id: integer('function_id'),
  qriteria_id: integer('qriteria_id'),
})

export const master_villages = pgTable('master_villages', {
  id: bigint('id').notNull().primaryKey(),
  master_district_id: integer('master_district_id'),
  name: varchar('name'),
  map_location: text('map_location'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const membership_packages = pgTable('membership_packages', {
  id: integer('id').notNull().primaryKey(),
  tld_token: integer('tld_token'),
  orvi_token: integer('orvi_token'),
  resume_search_quota: integer('resume_search_quota'),
  post_job_quota: integer('post_job_quota'),
  repost_job_quota: integer('repost_job_quota'),
  price: integer('price'),
  description: varchar('description'),
  month: integer('month'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const memberships = pgTable('memberships', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  price: integer('price'),
  company_name: varchar('company_name'),
  company_address: varchar('company_address'),
  company_zip_code: varchar('company_zip_code'),
  contact_person: varchar('contact_person'),
  npwp: varchar('npwp'),
  starting_date: timestamp('starting_date'),
  expired_date: date('expired_date'),
  max_job: integer('max_job'),
  posting_date: timestamp('posting_date'),
  membership_length_in_months: integer('membership_length_in_months'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  legacy_data: json('legacy_data'),
  trial: boolean('trial'),
  name: varchar('name'),
  can_read_resume: boolean('can_read_resume'),
  max_resume: integer('max_resume'),
  repost_job_quota: integer('repost_job_quota'),
  gsource: varchar('gsource'),
  paid: boolean('paid'),
})

export const net_promoter_scores = pgTable('net_promoter_scores', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  score: integer('score'),
  category: varchar('category'),
  comment_type: integer('comment_type'),
  comment: text('comment'),
  gsource: varchar('gsource'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const notifications = pgTable('notifications', {
  id: integer('id').notNull().primaryKey(),
  raw: text('raw'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const onboarding_notifications = pgTable('onboarding_notifications', {
  id: integer('id').notNull().primaryKey(),
  start_date: date('start_date'),
  end_date: date('end_date'),
  controller: varchar('controller'),
  action: varchar('action'),
  body: text('body'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const opportunities = pgTable('opportunities', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  industry_id: integer('industry_id'),
  website: varchar('website'),
  email: varchar('email'),
  contact_name: varchar('contact_name'),
  address: varchar('address'),
  location_id: integer('location_id'),
  job_level_ids: text('job_level_ids'),
  job_function_id: integer('job_function_id'),
  degree_id: integer('degree_id'),
  major_ids: text('major_ids'),
  requirements: text('requirements'),
  responsibilities: text('responsibilities'),
  expires_at: date('expires_at'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  salary_lower: integer('salary_lower'),
  salary_upper: integer('salary_upper'),
  posted_at: timestamp('posted_at'),
  applicants_count: integer('applicants_count'),
  work_experience_in_months: integer('work_experience_in_months'),
  confidential: boolean('confidential'),
  search_vector: text('search_vector'),
  private: boolean('private'),
  membership_id: integer('membership_id'),
  job_position: varchar('job_position'),
  required_gender: integer('required_gender'),
  required_min_age: integer('required_min_age'),
  required_max_age: integer('required_max_age'),
  email_alert: boolean('email_alert'),
  map_location: text('map_location'),
  degree_ids: text('degree_ids'),
  redirect: varchar('redirect'),
  featured: boolean('featured'),
  hide_map: boolean('hide_map'),
  erika_id: integer('erika_id'),
  draft: boolean('draft'),
  export_to_linkedin: boolean('export_to_linkedin'),
  export_to_line: boolean('export_to_line'),
  partner_id: integer('partner_id'),
  unique_code: varchar('unique_code'),
  unique_id: varchar('unique_id'),
  hide_company: boolean('hide_company'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  job_function_ids: text('job_function_ids'),
  from_erika: boolean('from_erika'),
  is_urgent: boolean('is_urgent'),
  unprocessed_applicant_ids: text('unprocessed_applicant_ids'),
  unprocessed_applicant_count: integer('unprocessed_applicant_count'),
  offline_hiring: boolean('offline_hiring'),
  offline_token: varchar('offline_token'),
  post_score: integer('post_score'),
  rank_score: integer('rank_score'),
  rules_id: integer('rules_id'),
  category: integer('category'),
  quota_premium: integer('quota_premium'),
  job_title_id: integer('job_title_id'),
  repost_count: integer('repost_count'),
  workplace_id: integer('workplace_id'),
  required_skills: text('required_skills'),
  country_id: integer('country_id'),
  visited_count: integer('visited_count'),
  job_type_id: integer('job_type_id'),
})

export const opportunities_recommendations = pgTable('opportunities_recommendations', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  created_at: timestamp('created_at'),
})

export const opportunity_branches = pgTable('opportunity_branches', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  branch_id: integer('branch_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const opportunity_interview_details = pgTable('opportunity_interview_details', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  name: varchar('name'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const opportunity_maps = pgTable('opportunity_maps', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  location_id: integer('location_id'),
  latitude: numeric('latitude'),
  longitude: numeric('longitude'),
  map_location_json: varchar('map_location_json'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  name: varchar('name'),
})

export const opportunity_match_systems = pgTable('opportunity_match_systems', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  job_title: boolean('job_title'),
  job_function: boolean('job_function'),
  industry: boolean('industry'),
  location: boolean('location'),
  job_level: boolean('job_level'),
  salary: boolean('salary'),
  degree: boolean('degree'),
  major: boolean('major'),
  work_experience: boolean('work_experience'),
  age: boolean('age'),
  gender: boolean('gender'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  matching_percentage: integer('matching_percentage'),
})

export const opportunity_translations = pgTable('opportunity_translations', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id').notNull(),
  locale: varchar('locale').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  job_position: varchar('job_position'),
})

export const orders = pgTable('orders', {
  id: integer('id').notNull().primaryKey(),
  order_number: varchar('order_number'),
  quantity: integer('quantity'),
  invoice_id: varchar('invoice_id'),
  company_id: integer('company_id'),
  user_id: integer('user_id'),
  amount: numeric('amount'),
  transaction_id: varchar('transaction_id'),
  payment_type: varchar('payment_type'),
  transaction_status: varchar('transaction_status'),
  status_message: varchar('status_message'),
  transaction_time: timestamp('transaction_time'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  fraud_status: varchar('fraud_status'),
  package_id: integer('package_id'),
})

export const organization_experiences = pgTable('organization_experiences', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  name: varchar('name'),
  job_title: varchar('job_title'),
  description: text('description'),
  start_year: integer('start_year'),
  end_year: integer('end_year'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  start_month: integer('start_month'),
  end_month: integer('end_month'),
  country_id: integer('country_id'),
  district_id: integer('district_id'),
})

export const otp_tokens = pgTable('otp_tokens', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  otp_identifier: varchar('otp_identifier').notNull(),
  token: integer('token').notNull(),
  otp_type: varchar('otp_type'),
  is_active: boolean('is_active'),
  expired_at: timestamp('expired_at'),
  created_at: timestamp('created_at'),
})

export const participant_companies = pgTable('participant_companies', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  logo: varchar('logo'),
  type: varchar('type'),
})

export const partners = pgTable('partners', {
})

export const payment_logs = pgTable('payment_logs', {
  id: integer('id').notNull().primaryKey(),
  payment_id: integer('payment_id'),
  status_from: varchar('status_from'),
  status_to: varchar('status_to'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const payments = pgTable('payments', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  external_transaction_id: varchar('external_transaction_id'),
  status: varchar('status'),
  type: varchar('type'),
  information: jsonb('information'),
  amount: integer('amount'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const product_inquiries = pgTable('product_inquiries', {
  id: integer('id').notNull().primaryKey(),
  contact_name: varchar('contact_name'),
  email: varchar('email'),
  phone: varchar('phone'),
  contact_phone: varchar('contact_phone'),
  company_name: varchar('company_name'),
  company_group_size: integer('company_group_size'),
  description: varchar('description'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const referral_lottery_winners = pgTable('referral_lottery_winners', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  prize: varchar('prize'),
  period: integer('period'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const referral_redeem_transactions = pgTable('referral_redeem_transactions', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  type: integer('type'),
  redeemed_points: integer('redeemed_points'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const report_abuses = pgTable('report_abuses', {
  id: integer('id').notNull().primaryKey(),
  abuse_type_id: integer('abuse_type_id'),
  user_id: integer('user_id'),
  platform: varchar('platform'),
  opportunity_id: integer('opportunity_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const resume_completions = pgTable('resume_completions', {
  id: integer('id').notNull().primaryKey(),
  completion: integer('completion').notNull(),
  percentage: varchar('percentage'),
  user_id: integer('user_id'),
})

export const salary_benchmarks = pgTable('salary_benchmarks', {
  id: integer('id').notNull().primaryKey(),
  industry_id: integer('industry_id'),
  job_level_id: integer('job_level_id'),
  experience_min: integer('experience_min'),
  experience_max: integer('experience_max'),
  salary_min: integer('salary_min'),
  salary_max: integer('salary_max'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const salary_comparison_results = pgTable('salary_comparison_results', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  job_function_name: varchar('job_function_name'),
  job_level_id: integer('job_level_id'),
  company_name: varchar('company_name'),
  monthly_salary: integer('monthly_salary'),
  address: varchar('address'),
  phone: varchar('phone'),
  birth: date('birth'),
  job_category_id: integer('job_category_id'),
  industry_id: integer('industry_id'),
  company_type_id: integer('company_type_id'),
  experience_years_length: integer('experience_years_length'),
  gender_id: integer('gender_id'),
  location_id: integer('location_id'),
  degree_id: integer('degree_id'),
  salary_min_market: integer('salary_min_market'),
  salary_max_market: integer('salary_max_market'),
  salary_min_experience_years_length: integer('salary_min_experience_years_length'),
  salary_max_experience_years_length: integer('salary_max_experience_years_length'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  result: integer('result'),
})

export const salary_predictions = pgTable('salary_predictions', {
  id: integer('id').notNull().primaryKey(),
  company_type_id: integer('company_type_id'),
  industry_id: integer('industry_id'),
  job_category_id: integer('job_category_id'),
  job_level_id: integer('job_level_id'),
  location_id: integer('location_id'),
  degree_id: integer('degree_id'),
  experience_years_length: integer('experience_years_length'),
  actual_salary: integer('actual_salary'),
  minimum_salary: integer('minimum_salary'),
  maximum_salary: integer('maximum_salary'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  status: integer('status'),
})

export const saved_opportunities = pgTable('saved_opportunities', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const schema_migrations = pgTable('schema_migrations', {
  version: varchar('version').notNull(),
})

export const selected_opportunities = pgTable('selected_opportunities', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  created_at: timestamp('created_at').notNull(),
  platform: varchar('platform'),
  location: boolean('location'),
  job_function: boolean('job_function'),
  experience: boolean('experience'),
  salary: boolean('salary'),
  industry: boolean('industry'),
  job_level: boolean('job_level'),
  degree: boolean('degree'),
  major: boolean('major'),
  gender: boolean('gender'),
  age: boolean('age'),
  matched_count: integer('matched_count'),
  status: integer('status'),
  utm_source: varchar('utm_source'),
  utm_medium: varchar('utm_medium'),
  job_function_name: boolean('job_function_name'),
  counter_allowed_match: integer('counter_allowed_match'),
  updated_at: timestamp('updated_at'),
  interview_invitation: boolean('interview_invitation'),
  interview_status: integer('interview_status'),
  interview_date: date('interview_date'),
  erika_id: integer('erika_id'),
  deadline_date: date('deadline_date'),
  invitation_subject: varchar('invitation_subject'),
  invitation_message: varchar('invitation_message'),
  utm_campaign: varchar('utm_campaign'),
  rules_completion_percentage: integer('rules_completion_percentage'),
  apply_from: varchar('apply_from'),
  cancel_at: timestamp('cancel_at'),
})

export const selected_opportunity_branches = pgTable('selected_opportunity_branches', {
  id: integer('id').notNull().primaryKey(),
  selected_opportunity_id: integer('selected_opportunity_id'),
  branch_id: integer('branch_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const selected_users = pgTable('selected_users', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  user_id: integer('user_id'),
  opportunity_id: integer('opportunity_id'),
  created_at: timestamp('created_at').notNull(),
})

export const sent_notifications = pgTable('sent_notifications', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  campaign: varchar('campaign'),
  channel: integer('channel'),
  sent_at: timestamp('sent_at'),
})

export const skills = pgTable('skills', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  position: integer('position'),
  name: varchar('name'),
  skill_level_id: integer('skill_level_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const spatial_ref_sys = pgTable('spatial_ref_sys', {
  srid: integer('srid').notNull().primaryKey(),
  auth_name: varchar('auth_name'),
  auth_srid: integer('auth_srid'),
  srtext: varchar('srtext'),
  proj4text: varchar('proj4text'),
})

export const speakers = pgTable('speakers', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  job_title: varchar('job_title'),
  photo: varchar('photo'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const subscriptions = pgTable('subscriptions', {
  id: integer('id').notNull().primaryKey(),
  firstname: varchar('firstname'),
  lastname: varchar('lastname'),
  email: varchar('email'),
  company: varchar('company'),
  phone: varchar('phone'),
  location_id: integer('location_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  location: varchar('location'),
  position: varchar('position'),
})

export const supports = pgTable('supports', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  description: varchar('description'),
  platform: varchar('platform'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const templates = pgTable('templates', {
  id: integer('id').notNull().primaryKey(),
  name: varchar('name'),
  content: text('content'),
  params: text('params'),
  type: varchar('type'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
  thumbnail: varchar('thumbnail'),
})

export const temporary_users = pgTable('temporary_users', {
  id: integer('id').notNull().primaryKey(),
  value: json('value'),
  token: varchar('token'),
})

export const test_read = pgTable('test_read', {
  user_id: integer('user_id').notNull().primaryKey(),
  username: varchar('username').notNull(),
})

export const tmp_table_job_kobus_pt = pgTable('tmp_table_job_kobus_pt', {
  job_title: varchar('job_title'),
  company: varchar('company'),
})

export const tmp_table_kobus_pt = pgTable('tmp_table_kobus_pt', {
  email: varchar('email'),
})

export const user_company_subscriptions = pgTable('user_company_subscriptions', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  company_id: integer('company_id'),
  subscribed: boolean('subscribed'),
  created_at: timestamp('created_at'),
})

export const user_device_histories = pgTable('user_device_histories', {
  id: bigint('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  created_at: bigint('created_at').notNull(),
  updated_at: bigint('updated_at').notNull(),
  expired_at: bigint('expired_at').notNull(),
  deleted_at: bigint('deleted_at'),
  ip_address: text('ip_address').notNull(),
  device_name: text('device_name').notNull(),
  unique: text('unique').notNull(),
})

export const user_devices = pgTable('user_devices', {
  user_id: integer('user_id').notNull().primaryKey(),
  device_id: varchar('device_id').notNull(),
  device_type: varchar('device_type').notNull(),
  created_at: timestamp('created_at'),
  id: integer('id').notNull(),
})

export const user_egtcs = pgTable('user_egtcs', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  egtc_id: integer('egtc_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  university: varchar('university'),
})

export const user_events = pgTable('user_events', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  event_id: integer('event_id'),
  confirmed: boolean('confirmed'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  uniq_code: varchar('uniq_code'),
  source: varchar('source'),
  member_type: varchar('member_type'),
})

export const user_journals = pgTable('user_journals', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  title: varchar('title').notNull(),
  url: text('url').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const user_master_job_function_preferences = pgTable('user_master_job_function_preferences', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  master_job_function_id: integer('master_job_function_id'),
  created_at: timestamp('created_at'),
})

export const user_master_location_preferences = pgTable('user_master_location_preferences', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  master_location_id: integer('master_location_id'),
  created_at: timestamp('created_at'),
})

export const user_memberships = pgTable('user_memberships', {
  id: integer('id').notNull().primaryKey(),
  expired_date: date('expired_date'),
  user_id: integer('user_id'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  payment_id: integer('payment_id'),
})

export const user_notification = pgTable('user_notification', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  type: varchar('type'),
  status: boolean('status'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
})

export const user_phone_verifications = pgTable('user_phone_verifications', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  cell_number: varchar('cell_number'),
  otp: varchar('otp'),
  verified_at: timestamp('verified_at'),
  valid_until: timestamp('valid_until'),
  created_at: timestamp('created_at'),
})

export const user_portofolio = pgTable('user_portofolio', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  url: text('url'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const user_preferences = pgTable('user_preferences', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  actively_looking: boolean('actively_looking'),
  received_information: boolean('received_information'),
  created_at: timestamp('created_at'),
  auto_apply: boolean('auto_apply'),
})

export const user_profile_referrals = pgTable('user_profile_referrals', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  name: varchar('name').notNull(),
  linkedin_url: text('linkedin_url'),
  job_position: varchar('job_position').notNull(),
  company_name: varchar('company_name').notNull(),
  phone_number: varchar('phone_number').notNull(),
  email: varchar('email').notNull(),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const user_profiles = pgTable('user_profiles', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  first_name: varchar('first_name'),
  middle_name: varchar('middle_name'),
  last_name: varchar('last_name'),
  birth: date('birth'),
  gender_id: integer('gender_id'),
  relationship_status_id: integer('relationship_status_id'),
  address: varchar('address'),
  zip_code: varchar('zip_code'),
  location_id: integer('location_id'),
  phone: varchar('phone'),
  fax: varchar('fax'),
  cell: varchar('cell'),
  website: varchar('website'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  avatar_filename: varchar('avatar_filename'),
  description: text('description'),
  cover_letter: text('cover_letter'),
  desired_salary_lower: integer('desired_salary_lower'),
  desired_salary_upper: integer('desired_salary_upper'),
  desired_job_level_ids: text('desired_job_level_ids'),
  desired_job_function_ids: text('desired_job_function_ids'),
  desired_job_category_ids: text('desired_job_category_ids'),
  desired_job_type_ids: text('desired_job_type_ids'),
  desired_industry_ids: text('desired_industry_ids'),
  desired_location_ids: text('desired_location_ids'),
  desired_salary_original: varchar('desired_salary_original'),
  nationality: varchar('nationality'),
  nationality_original: varchar('nationality_original'),
  experiences: integer('experiences'),
  experience_years_length: integer('experience_years_length'),
  map_location: text('map_location'),
  youtube_id: varchar('youtube_id'),
  benefit_ids: text('benefit_ids'),
  jwplayer_id: varchar('jwplayer_id'),
  headline: varchar('headline'),
  last_filter: json('last_filter'),
  new_cell: varchar('new_cell'),
  is_new_cell_verified: boolean('is_new_cell_verified'),
  location_gmap_raw: jsonb('location_gmap_raw'),
  sub_district: varchar('sub_district'),
  village: varchar('village'),
  master_district_id: bigint('master_district_id'),
  master_village_id: bigint('master_village_id'),
  fresh_graduate: boolean('fresh_graduate'),
  master_country_id: integer('master_country_id'),
  master_province_id: integer('master_province_id'),
  master_regency_id: integer('master_regency_id'),
  desired_job_positions: text('desired_job_positions'),
})

export const user_profiles_20231212 = pgTable('user_profiles_20231212', {
  id: integer('id'),
  user_id: integer('user_id'),
  first_name: varchar('first_name'),
  middle_name: varchar('middle_name'),
  last_name: varchar('last_name'),
  birth: date('birth'),
  gender_id: integer('gender_id'),
  relationship_status_id: integer('relationship_status_id'),
  address: varchar('address'),
  zip_code: varchar('zip_code'),
  location_id: integer('location_id'),
  phone: varchar('phone'),
  fax: varchar('fax'),
  cell: varchar('cell'),
  website: varchar('website'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
  avatar_filename: varchar('avatar_filename'),
  description: text('description'),
  cover_letter: text('cover_letter'),
  desired_salary_lower: integer('desired_salary_lower'),
  desired_salary_upper: integer('desired_salary_upper'),
  desired_job_level_ids: text('desired_job_level_ids'),
  desired_job_function_ids: text('desired_job_function_ids'),
  desired_job_category_ids: text('desired_job_category_ids'),
  desired_job_type_ids: text('desired_job_type_ids'),
  desired_industry_ids: text('desired_industry_ids'),
  desired_location_ids: text('desired_location_ids'),
  desired_salary_original: varchar('desired_salary_original'),
  nationality: varchar('nationality'),
  nationality_original: varchar('nationality_original'),
  experiences: integer('experiences'),
  experience_years_length: integer('experience_years_length'),
  map_location: text('map_location'),
  youtube_id: varchar('youtube_id'),
  benefit_ids: text('benefit_ids'),
  jwplayer_id: varchar('jwplayer_id'),
  headline: varchar('headline'),
  last_filter: json('last_filter'),
  new_cell: varchar('new_cell'),
  is_new_cell_verified: boolean('is_new_cell_verified'),
  location_gmap_raw: jsonb('location_gmap_raw'),
  sub_district: varchar('sub_district'),
  village: varchar('village'),
  master_district_id: bigint('master_district_id'),
  master_village_id: bigint('master_village_id'),
  fresh_graduate: boolean('fresh_graduate'),
  master_country_id: integer('master_country_id'),
  master_province_id: integer('master_province_id'),
  master_regency_id: integer('master_regency_id'),
  desired_job_positions: text('desired_job_positions'),
})

export const user_referrals = pgTable('user_referrals', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  referral_code: varchar('referral_code'),
  referrer_user_id: integer('referrer_user_id'),
  referent_count: integer('referent_count'),
  email_last_sent_at: timestamp('email_last_sent_at'),
  lottery_coupon: integer('lottery_coupon'),
  total_redeemed_points: integer('total_redeemed_points'),
  phone_number: varchar('phone_number'),
  has_direct_redeem: boolean('has_direct_redeem'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
})

export const user_resumes = pgTable('user_resumes', {
  id: integer('id').notNull().primaryKey(),
  updated_at: timestamp('updated_at').notNull(),
  search_vector: text('search_vector'),
  work_experiences_count: smallint('work_experiences_count').notNull(),
  educations_count: smallint('educations_count').notNull(),
  location_id: integer('location_id'),
  gender_id: smallint('gender_id'),
  birth: date('birth'),
  max_gpa: smallint('max_gpa'),
  desired_salary_lower: integer('desired_salary_lower'),
  desired_salary_upper: integer('desired_salary_upper'),
  education_degree: smallint('education_degree'),
  efset_cefr: varchar('efset_cefr'),
})

export const users = pgTable('users', {
  id: integer('id').notNull().primaryKey(),
  email: varchar('email').notNull(),
  encrypted_password: varchar('encrypted_password').notNull(),
  reset_password_token: varchar('reset_password_token'),
  reset_password_sent_at: timestamp('reset_password_sent_at'),
  remember_created_at: timestamp('remember_created_at'),
  sign_in_count: integer('sign_in_count').notNull(),
  current_sign_in_at: timestamp('current_sign_in_at'),
  last_sign_in_at: timestamp('last_sign_in_at'),
  current_sign_in_ip: text('current_sign_in_ip'),
  last_sign_in_ip: text('last_sign_in_ip'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  admin: boolean('admin'),
  confirmation_token: varchar('confirmation_token'),
  confirmed_at: timestamp('confirmed_at'),
  confirmation_sent_at: timestamp('confirmation_sent_at'),
  unconfirmed_email: varchar('unconfirmed_email'),
  search_vector: text('search_vector'),
  email_blast_last_sent_at: timestamp('email_blast_last_sent_at'),
  employer: boolean('employer'),
  utm_source: varchar('utm_source'),
  utm_medium: varchar('utm_medium'),
  utm_campaign: varchar('utm_campaign'),
  unsubscribed: boolean('unsubscribed'),
  display_efset_result: boolean('display_efset_result'),
  efset_score: varchar('efset_score'),
  mt_academy: boolean('mt_academy'),
  efset_cefr: varchar('efset_cefr'),
  platform: varchar('platform'),
  referrer: varchar('referrer'),
  query_params: varchar('query_params'),
  log_count: json('log_count'),
  log_max_count: json('log_max_count'),
  disabled: boolean('disabled'),
  last_event_sign_in: varchar('last_event_sign_in'),
  display_interest_test_result: boolean('display_interest_test_result'),
  display_communication_style_test_result: boolean('display_communication_style_test_result'),
  token: varchar('token'),
  super_admin: boolean('super_admin'),
  work_experiences_count: integer('work_experiences_count'),
  educations_count: integer('educations_count'),
  bbm_id: varchar('bbm_id'),
  bbm_payload: jsonb('bbm_payload'),
  bbm_token_valid: timestamp('bbm_token_valid'),
  device_id: varchar('device_id'),
  guid: text('guid'),
  gsource: varchar('gsource'),
  syncable: boolean('syncable'),
  autologin_token: varchar('autologin_token'),
  autologin_token_expired_at: timestamp('autologin_token_expired_at'),
  session_token: varchar('session_token'),
  original_source: varchar('original_source'),
  acquire_date: timestamp('acquire_date'),
  last_seen_at: timestamp('last_seen_at'),
  communication_test: varchar('communication_test'),
  interest_test_category_ids: text('interest_test_category_ids'),
  active_member: boolean('active_member'),
  last_nps_at: timestamp('last_nps_at'),
  send_invite_app: timestamp('send_invite_app'),
  ppob_token: varchar('ppob_token'),
  last_sign_in_notif: timestamp('last_sign_in_notif'),
  deleted_at: timestamp('deleted_at'),
})

export const users_filter = pgTable('users_filter', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id').notNull(),
  name: varchar('name'),
  sort_by: varchar('sort_by').notNull(),
  function_id: varchar('function_id'),
  industry_id: varchar('industry_id'),
  major_id: varchar('major_id'),
  location_id: varchar('location_id'),
  expected_salary: varchar('expected_salary'),
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
  degree_id: varchar('degree_id'),
})

export const versions = pgTable('versions', {
  id: integer('id').notNull().primaryKey(),
  item_type: varchar('item_type').notNull(),
  item_id: integer('item_id').notNull(),
  event: varchar('event').notNull(),
  whodunnit: varchar('whodunnit'),
  object: text('object'),
  created_at: timestamp('created_at'),
  object_changes: text('object_changes'),
})

export const viewed_opportunities = pgTable('viewed_opportunities', {
  id: integer('id').notNull().primaryKey(),
  opportunity_id: integer('opportunity_id'),
  user_id: integer('user_id'),
  applied: boolean('applied'),
  applied_at: timestamp('applied_at'),
  created_at: timestamp('created_at').notNull(),
})

export const viewed_users = pgTable('viewed_users', {
  id: integer('id').notNull().primaryKey(),
  company_id: integer('company_id'),
  employer_id: integer('employer_id'),
  user_id: integer('user_id'),
  created_at: timestamp('created_at').notNull(),
  membership_id: integer('membership_id'),
  gsource: varchar('gsource'),
  unlocked_at: timestamp('unlocked_at'),
  viewed_at: timestamp('viewed_at'),
  unlock_source: varchar('unlock_source'),
})

export const whatsapp_job_preference = pgTable('whatsapp_job_preference', {
  id: integer('id').notNull().primaryKey(),
  email: varchar('email'),
  phone_number: varchar('phone_number'),
  function_id: varchar('function_id'),
  industry_id: varchar('industry_id'),
  job_id: integer('job_id'),
  expected_salary: bigint('expected_salary'),
  created_at: timestamp('created_at').notNull(),
})

export const work_experiences = pgTable('work_experiences', {
  id: integer('id').notNull().primaryKey(),
  user_id: integer('user_id'),
  position: integer('position'),
  company_name: varchar('company_name'),
  company_id: integer('company_id'),
  job_type_id: integer('job_type_id'),
  job_level_id: integer('job_level_id'),
  salary_id: integer('salary_id'),
  job_category_id: integer('job_category_id'),
  industry_id: integer('industry_id'),
  job_function_name: varchar('job_function_name'),
  job_function_id: integer('job_function_id'),
  description: varchar('description'),
  start_date: date('start_date'),
  end_date: date('end_date'),
  created_at: timestamp('created_at').notNull(),
  updated_at: timestamp('updated_at').notNull(),
  monthly_salary: integer('monthly_salary'),
  company_type_id: integer('company_type_id'),
  report_to: varchar('report_to'),
  location_id: integer('location_id'),
  job_title_id: integer('job_title_id'),
  country_id: integer('country_id'),
})

export const workshop_event = pgTable('workshop_event', {
  id: integer('id').notNull().primaryKey(),
  event_id: integer('event_id'),
  workshop_id: integer('workshop_id'),
})

export const workshops = pgTable('workshops', {
  id: integer('id').notNull().primaryKey(),
  logo: text('logo'),
  title: varchar('title').notNull(),
  date: date('date').notNull(),
  time_start: text('time_start').notNull(),
  time_end: text('time_end').notNull(),
  room: varchar('room'),
  url: text('url'),
  speakers: text('speakers'),
})