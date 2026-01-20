import { relations } from 'drizzle-orm'
import * as schema from './schema'

export const active_admin_commentsRelations = relations(
  schema.active_admin_comments,
  ({ one, many }) => ({
})
)

export const activehash_benefitsRelations = relations(
  schema.activehash_benefits,
  ({ one, many }) => ({
})
)

export const activehash_degreesRelations = relations(
  schema.activehash_degrees,
  ({ one, many }) => ({
})
)

export const activehash_job_levelsRelations = relations(
  schema.activehash_job_levels,
  ({ one, many }) => ({
})
)

export const activehash_job_typesRelations = relations(
  schema.activehash_job_types,
  ({ one, many }) => ({
})
)

export const activehash_relationshipsRelations = relations(
  schema.activehash_relationships,
  ({ one, many }) => ({
})
)

export const activehash_skill_levelsRelations = relations(
  schema.activehash_skill_levels,
  ({ one, many }) => ({
})
)

export const ad_trackersRelations = relations(
  schema.ad_trackers,
  ({ one, many }) => ({

    ads: one(schema.ads, {
      fields: [schema.ad_trackers.ad_id],
      references: [schema.ads.id],
    }),

    users: one(schema.users, {
      fields: [schema.ad_trackers.user_id],
      references: [schema.users.id],
    }),
})
)

export const admin_authenticationsRelations = relations(
  schema.admin_authentications,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.admin_authentications.user_id],
      references: [schema.users.id],
    }),
})
)

export const adsRelations = relations(
  schema.ads,
  ({ one, many }) => ({

    ad_trackers: many(schema.ad_trackers),
})
)

export const apply_logsRelations = relations(
  schema.apply_logs,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.apply_logs.opportunity_id],
      references: [schema.opportunities.id],
    }),

    users: one(schema.users, {
      fields: [schema.apply_logs.user_id],
      references: [schema.users.id],
    }),
})
)

export const assessment_answersRelations = relations(
  schema.assessment_answers,
  ({ one, many }) => ({

    assessments: one(schema.assessments, {
      fields: [schema.assessment_answers.assessment_id],
      references: [schema.assessments.id],
    }),

    selected_opportunities: one(schema.selected_opportunities, {
      fields: [schema.assessment_answers.selected_opportunity_id],
      references: [schema.selected_opportunities.id],
    }),
})
)

export const assessmentsRelations = relations(
  schema.assessments,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.assessments.opportunity_id],
      references: [schema.opportunities.id],
    }),

    assessment_answers: many(schema.assessment_answers),
})
)

export const attachmentsRelations = relations(
  schema.attachments,
  ({ one, many }) => ({

    certifications: many(schema.certifications),

    language_proficiencies: many(schema.language_proficiencies),
})
)

export const auditsRelations = relations(
  schema.audits,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.audits.user_id],
      references: [schema.users.id],
    }),
})
)

export const auto_apply_logRelations = relations(
  schema.auto_apply_log,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.auto_apply_log.user_id],
      references: [schema.users.id],
    }),
})
)

export const awsdms_ddl_auditRelations = relations(
  schema.awsdms_ddl_audit,
  ({ one, many }) => ({
})
)

export const billing_infosRelations = relations(
  schema.billing_infos,
  ({ one, many }) => ({

    orders: one(schema.orders, {
      fields: [schema.billing_infos.order_id],
      references: [schema.orders.id],
    }),

    users: one(schema.users, {
      fields: [schema.billing_infos.user_id],
      references: [schema.users.id],
    }),
})
)

export const branchesRelations = relations(
  schema.branches,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.branches.company_id],
      references: [schema.companies.id],
    }),
})
)

export const candidate_notificationsRelations = relations(
  schema.candidate_notifications,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.candidate_notifications.user_id],
      references: [schema.users.id],
    }),
})
)

export const certificationsRelations = relations(
  schema.certifications,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.certifications.user_id],
      references: [schema.users.id],
    }),

    attachments: one(schema.attachments, {
      fields: [schema.certifications.attachment_id],
      references: [schema.attachments.id],
    }),
})
)

export const ckeditor_assetsRelations = relations(
  schema.ckeditor_assets,
  ({ one, many }) => ({
})
)

export const client_codesRelations = relations(
  schema.client_codes,
  ({ one, many }) => ({
})
)

export const communication_test_informationsRelations = relations(
  schema.communication_test_informations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.communication_test_informations.user_id],
      references: [schema.users.id],
    }),

    communication_test_results: many(schema.communication_test_results),
})
)

export const communication_test_resultsRelations = relations(
  schema.communication_test_results,
  ({ one, many }) => ({

    communication_test_informations: one(schema.communication_test_informations, {
      fields: [schema.communication_test_results.communication_test_information_id],
      references: [schema.communication_test_informations.id],
    }),
})
)

export const companiesRelations = relations(
  schema.companies,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.companies.user_id],
      references: [schema.users.id],
    }),

    enquiries: one(schema.enquiries, {
      fields: [schema.companies.enquiry_id],
      references: [schema.enquiries.id],
    }),

    branches: many(schema.branches),

    company_benefits: many(schema.company_benefits),

    company_galleries: many(schema.company_galleries),

    company_users: many(schema.company_users),

    featured_company_on_cities: many(schema.featured_company_on_cities),

    featured_company_on_industries: many(schema.featured_company_on_industries),

    fraud_reports: many(schema.fraud_reports),

    marked_users: many(schema.marked_users),

    memberships: many(schema.memberships),

    opportunities: many(schema.opportunities),

    orders: many(schema.orders),

    selected_users: many(schema.selected_users),

    user_company_subscriptions: many(schema.user_company_subscriptions),

    viewed_users: many(schema.viewed_users),

    work_experiences: many(schema.work_experiences),
})
)

export const company_benefitsRelations = relations(
  schema.company_benefits,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.company_benefits.company_id],
      references: [schema.companies.id],
    }),
})
)

export const company_filtersRelations = relations(
  schema.company_filters,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.company_filters.user_id],
      references: [schema.users.id],
    }),
})
)

export const company_galleriesRelations = relations(
  schema.company_galleries,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.company_galleries.company_id],
      references: [schema.companies.id],
    }),
})
)

export const company_hiring_opportunitiesRelations = relations(
  schema.company_hiring_opportunities,
  ({ one, many }) => ({

    company_hirings: one(schema.company_hirings, {
      fields: [schema.company_hiring_opportunities.company_hiring_id],
      references: [schema.company_hirings.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.company_hiring_opportunities.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const company_hiring_usersRelations = relations(
  schema.company_hiring_users,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.company_hiring_users.user_id],
      references: [schema.users.id],
    }),

    company_hirings: one(schema.company_hirings, {
      fields: [schema.company_hiring_users.company_hiring_id],
      references: [schema.company_hirings.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.company_hiring_users.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const company_hiringsRelations = relations(
  schema.company_hirings,
  ({ one, many }) => ({

    company_hiring_opportunities: many(schema.company_hiring_opportunities),

    company_hiring_users: many(schema.company_hiring_users),

    crp_caller_campaigns: many(schema.crp_caller_campaigns),

    crp_company_hiring_opportunity_locations: many(schema.crp_company_hiring_opportunity_locations),
})
)

export const company_usersRelations = relations(
  schema.company_users,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.company_users.user_id],
      references: [schema.users.id],
    }),

    companies: one(schema.companies, {
      fields: [schema.company_users.company_id],
      references: [schema.companies.id],
    }),
})
)

export const cookie_emailsRelations = relations(
  schema.cookie_emails,
  ({ one, many }) => ({
})
)

export const cookie_jobsRelations = relations(
  schema.cookie_jobs,
  ({ one, many }) => ({
})
)

export const cookie_searchesRelations = relations(
  schema.cookie_searches,
  ({ one, many }) => ({
})
)

export const cover_imagesRelations = relations(
  schema.cover_images,
  ({ one, many }) => ({
})
)

export const crp_caller_campaignsRelations = relations(
  schema.crp_caller_campaigns,
  ({ one, many }) => ({

    company_hirings: one(schema.company_hirings, {
      fields: [schema.crp_caller_campaigns.company_hiring_id],
      references: [schema.company_hirings.id],
    }),

    crp_caller_users: many(schema.crp_caller_users),
})
)

export const crp_caller_usersRelations = relations(
  schema.crp_caller_users,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.crp_caller_users.user_id],
      references: [schema.users.id],
    }),

    crp_caller_campaigns: one(schema.crp_caller_campaigns, {
      fields: [schema.crp_caller_users.crp_caller_campaign_id],
      references: [schema.crp_caller_campaigns.id],
    }),
})
)

export const crp_company_hiring_opportunity_locationsRelations = relations(
  schema.crp_company_hiring_opportunity_locations,
  ({ one, many }) => ({

    company_hirings: one(schema.company_hirings, {
      fields: [schema.crp_company_hiring_opportunity_locations.company_hiring_id],
      references: [schema.company_hirings.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.crp_company_hiring_opportunity_locations.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const custom_pagesRelations = relations(
  schema.custom_pages,
  ({ one, many }) => ({
})
)

export const editable_content_translationsRelations = relations(
  schema.editable_content_translations,
  ({ one, many }) => ({

    editable_contents: one(schema.editable_contents, {
      fields: [schema.editable_content_translations.editable_content_id],
      references: [schema.editable_contents.id],
    }),
})
)

export const editable_contentsRelations = relations(
  schema.editable_contents,
  ({ one, many }) => ({

    editable_content_translations: many(schema.editable_content_translations),
})
)

export const educationsRelations = relations(
  schema.educations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.educations.user_id],
      references: [schema.users.id],
    }),
})
)

export const efset_resultsRelations = relations(
  schema.efset_results,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.efset_results.user_id],
      references: [schema.users.id],
    }),
})
)

export const egtcsRelations = relations(
  schema.egtcs,
  ({ one, many }) => ({

    events: many(schema.events),

    user_egtcs: many(schema.user_egtcs),
})
)

export const enquiriesRelations = relations(
  schema.enquiries,
  ({ one, many }) => ({

    companies: many(schema.companies),
})
)

export const erika_user_notificationRelations = relations(
  schema.erika_user_notification,
  ({ one, many }) => ({

    notifications: one(schema.notifications, {
      fields: [schema.erika_user_notification.notifications_id],
      references: [schema.notifications.id],
    }),
})
)

export const event_opportunitiesRelations = relations(
  schema.event_opportunities,
  ({ one, many }) => ({

    events: one(schema.events, {
      fields: [schema.event_opportunities.event_id],
      references: [schema.events.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.event_opportunities.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const eventsRelations = relations(
  schema.events,
  ({ one, many }) => ({

    egtcs: one(schema.egtcs, {
      fields: [schema.events.egtc_id],
      references: [schema.egtcs.id],
    }),

    event_opportunities: many(schema.event_opportunities),

    user_events: many(schema.user_events),

    workshop_event: many(schema.workshop_event),
})
)

export const expo_participant_companiesRelations = relations(
  schema.expo_participant_companies,
  ({ one, many }) => ({

    expos: one(schema.expos, {
      fields: [schema.expo_participant_companies.expo_id],
      references: [schema.expos.id],
    }),

    participant_companies: one(schema.participant_companies, {
      fields: [schema.expo_participant_companies.participant_company_id],
      references: [schema.participant_companies.id],
    }),
})
)

export const exposRelations = relations(
  schema.expos,
  ({ one, many }) => ({

    expo_participant_companies: many(schema.expo_participant_companies),
})
)

export const featured_company_on_citiesRelations = relations(
  schema.featured_company_on_cities,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.featured_company_on_cities.company_id],
      references: [schema.companies.id],
    }),
})
)

export const featured_company_on_industriesRelations = relations(
  schema.featured_company_on_industries,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.featured_company_on_industries.company_id],
      references: [schema.companies.id],
    }),
})
)

export const fraud_reportsRelations = relations(
  schema.fraud_reports,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.fraud_reports.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.fraud_reports.opportunity_id],
      references: [schema.opportunities.id],
    }),

    companies: one(schema.companies, {
      fields: [schema.fraud_reports.company_id],
      references: [schema.companies.id],
    }),
})
)

export const highest_demand_by_industriesRelations = relations(
  schema.highest_demand_by_industries,
  ({ one, many }) => ({
})
)

export const highest_demand_job_functionsRelations = relations(
  schema.highest_demand_job_functions,
  ({ one, many }) => ({
})
)

export const hiring_documentsRelations = relations(
  schema.hiring_documents,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.hiring_documents.user_id],
      references: [schema.users.id],
    }),
})
)

export const identitiesRelations = relations(
  schema.identities,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.identities.user_id],
      references: [schema.users.id],
    }),
})
)

export const intelligence_test_informationsRelations = relations(
  schema.intelligence_test_informations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.intelligence_test_informations.user_id],
      references: [schema.users.id],
    }),

    intelligence_test_results: many(schema.intelligence_test_results),
})
)

export const intelligence_test_resultsRelations = relations(
  schema.intelligence_test_results,
  ({ one, many }) => ({

    intelligence_test_informations: one(schema.intelligence_test_informations, {
      fields: [schema.intelligence_test_results.intelligence_test_information_id],
      references: [schema.intelligence_test_informations.id],
    }),
})
)

export const interest_test_informationsRelations = relations(
  schema.interest_test_informations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.interest_test_informations.user_id],
      references: [schema.users.id],
    }),

    interest_test_results: many(schema.interest_test_results),
})
)

export const interest_test_resultsRelations = relations(
  schema.interest_test_results,
  ({ one, many }) => ({

    interest_test_informations: one(schema.interest_test_informations, {
      fields: [schema.interest_test_results.interest_test_information_id],
      references: [schema.interest_test_informations.id],
    }),
})
)

export const interview_answersRelations = relations(
  schema.interview_answers,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.interview_answers.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.interview_answers.opportunity_id],
      references: [schema.opportunities.id],
    }),

    interview_answers_items: many(schema.interview_answers_items),
})
)

export const interview_answers_itemsRelations = relations(
  schema.interview_answers_items,
  ({ one, many }) => ({

    interview_answers: one(schema.interview_answers, {
      fields: [schema.interview_answers_items.interview_answer_id],
      references: [schema.interview_answers.id],
    }),

    interview_questions: one(schema.interview_questions, {
      fields: [schema.interview_answers_items.interview_question_id],
      references: [schema.interview_questions.id],
    }),
})
)

export const interview_questionsRelations = relations(
  schema.interview_questions,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.interview_questions.opportunity_id],
      references: [schema.opportunities.id],
    }),

    interview_answers_items: many(schema.interview_answers_items),
})
)

export const invitationsRelations = relations(
  schema.invitations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.invitations.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.invitations.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const invited_emailsRelations = relations(
  schema.invited_emails,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.invited_emails.user_id],
      references: [schema.users.id],
    }),
})
)

export const job_alert_email_template_last_sentsRelations = relations(
  schema.job_alert_email_template_last_sents,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.job_alert_email_template_last_sents.user_id],
      references: [schema.users.id],
    }),

    job_alert_email_templates: one(schema.job_alert_email_templates, {
      fields: [schema.job_alert_email_template_last_sents.job_alert_email_template_id],
      references: [schema.job_alert_email_templates.id],
    }),
})
)

export const job_alert_email_templatesRelations = relations(
  schema.job_alert_email_templates,
  ({ one, many }) => ({

    job_alert_email_template_last_sents: many(schema.job_alert_email_template_last_sents),
})
)

export const job_alert_optionsRelations = relations(
  schema.job_alert_options,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.job_alert_options.user_id],
      references: [schema.users.id],
    }),
})
)

export const jobs_recommendationsRelations = relations(
  schema.jobs_recommendations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.jobs_recommendations.user_id],
      references: [schema.users.id],
    }),
})
)

export const karirpediaRelations = relations(
  schema.karirpedia,
  ({ one, many }) => ({
})
)

export const karirpedium_translationsRelations = relations(
  schema.karirpedium_translations,
  ({ one, many }) => ({
})
)

export const language_proficienciesRelations = relations(
  schema.language_proficiencies,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.language_proficiencies.user_id],
      references: [schema.users.id],
    }),

    attachments: one(schema.attachments, {
      fields: [schema.language_proficiencies.attachment_id],
      references: [schema.attachments.id],
    }),
})
)

export const log_alertsRelations = relations(
  schema.log_alerts,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.log_alerts.opportunity_id],
      references: [schema.opportunities.id],
    }),

    users: one(schema.users, {
      fields: [schema.log_alerts.user_id],
      references: [schema.users.id],
    }),
})
)

export const mag_downloadsRelations = relations(
  schema.mag_downloads,
  ({ one, many }) => ({

    mags: one(schema.mags, {
      fields: [schema.mag_downloads.mag_id],
      references: [schema.mags.id],
    }),
})
)

export const magsRelations = relations(
  schema.mags,
  ({ one, many }) => ({

    mag_downloads: many(schema.mag_downloads),
})
)

export const marked_usersRelations = relations(
  schema.marked_users,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.marked_users.company_id],
      references: [schema.companies.id],
    }),

    users: one(schema.users, {
      fields: [schema.marked_users.user_id],
      references: [schema.users.id],
    }),
})
)

export const marketing_pagesRelations = relations(
  schema.marketing_pages,
  ({ one, many }) => ({
})
)

export const master_admin_menusRelations = relations(
  schema.master_admin_menus,
  ({ one, many }) => ({
})
)

export const master_communication_testsRelations = relations(
  schema.master_communication_tests,
  ({ one, many }) => ({
})
)

export const master_company_type_translationsRelations = relations(
  schema.master_company_type_translations,
  ({ one, many }) => ({

    master_company_types: one(schema.master_company_types, {
      fields: [schema.master_company_type_translations.master_company_type_id],
      references: [schema.master_company_types.id],
    }),
})
)

export const master_company_typesRelations = relations(
  schema.master_company_types,
  ({ one, many }) => ({

    master_company_type_translations: many(schema.master_company_type_translations),
})
)

export const master_countriesRelations = relations(
  schema.master_countries,
  ({ one, many }) => ({

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),
})
)

export const master_districtsRelations = relations(
  schema.master_districts,
  ({ one, many }) => ({

    master_regencies: one(schema.master_regencies, {
      fields: [schema.master_districts.master_regency_id],
      references: [schema.master_regencies.id],
    }),

    master_villages: many(schema.master_villages),

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),
})
)

export const master_industriesRelations = relations(
  schema.master_industries,
  ({ one, many }) => ({

    master_industry_translations: many(schema.master_industry_translations),
})
)

export const master_industry_translationsRelations = relations(
  schema.master_industry_translations,
  ({ one, many }) => ({

    master_industries: one(schema.master_industries, {
      fields: [schema.master_industry_translations.master_industry_id],
      references: [schema.master_industries.id],
    }),
})
)

export const master_intelligence_testsRelations = relations(
  schema.master_intelligence_tests,
  ({ one, many }) => ({
})
)

export const master_interest_testsRelations = relations(
  schema.master_interest_tests,
  ({ one, many }) => ({
})
)

export const master_job_categoriesRelations = relations(
  schema.master_job_categories,
  ({ one, many }) => ({

    master_job_category_translations: many(schema.master_job_category_translations),

    master_job_functions: many(schema.master_job_functions),
})
)

export const master_job_category_translationsRelations = relations(
  schema.master_job_category_translations,
  ({ one, many }) => ({

    master_job_categories: one(schema.master_job_categories, {
      fields: [schema.master_job_category_translations.master_job_category_id],
      references: [schema.master_job_categories.id],
    }),
})
)

export const master_job_function_groupsRelations = relations(
  schema.master_job_function_groups,
  ({ one, many }) => ({

    master_job_functions: many(schema.master_job_functions),
})
)

export const master_job_function_translationsRelations = relations(
  schema.master_job_function_translations,
  ({ one, many }) => ({

    master_job_functions: one(schema.master_job_functions, {
      fields: [schema.master_job_function_translations.master_job_function_id],
      references: [schema.master_job_functions.id],
    }),
})
)

export const master_job_functionsRelations = relations(
  schema.master_job_functions,
  ({ one, many }) => ({

    master_job_categories: one(schema.master_job_categories, {
      fields: [schema.master_job_functions.master_job_category_id],
      references: [schema.master_job_categories.id],
    }),

    master_job_function_groups: one(schema.master_job_function_groups, {
      fields: [schema.master_job_functions.master_job_function_group_id],
      references: [schema.master_job_function_groups.id],
    }),

    master_job_function_translations: many(schema.master_job_function_translations),

    user_master_job_function_preferences: many(schema.user_master_job_function_preferences),
})
)

export const master_job_titlesRelations = relations(
  schema.master_job_titles,
  ({ one, many }) => ({
})
)

export const master_location_translationsRelations = relations(
  schema.master_location_translations,
  ({ one, many }) => ({

    master_locations: one(schema.master_locations, {
      fields: [schema.master_location_translations.master_location_id],
      references: [schema.master_locations.id],
    }),
})
)

export const master_locationsRelations = relations(
  schema.master_locations,
  ({ one, many }) => ({

    master_regencies: one(schema.master_regencies, {
      fields: [schema.master_locations.master_regency_id],
      references: [schema.master_regencies.id],
    }),

    master_location_translations: many(schema.master_location_translations),

    user_master_location_preferences: many(schema.user_master_location_preferences),
})
)

export const master_major_translationsRelations = relations(
  schema.master_major_translations,
  ({ one, many }) => ({

    master_majors: one(schema.master_majors, {
      fields: [schema.master_major_translations.master_major_id],
      references: [schema.master_majors.id],
    }),
})
)

export const master_majorsRelations = relations(
  schema.master_majors,
  ({ one, many }) => ({

    master_major_translations: many(schema.master_major_translations),
})
)

export const master_provincesRelations = relations(
  schema.master_provinces,
  ({ one, many }) => ({

    master_regencies: many(schema.master_regencies),

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),
})
)

export const master_regenciesRelations = relations(
  schema.master_regencies,
  ({ one, many }) => ({

    master_provinces: one(schema.master_provinces, {
      fields: [schema.master_regencies.master_province_id],
      references: [schema.master_provinces.id],
    }),

    master_districts: many(schema.master_districts),

    master_locations: many(schema.master_locations),

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),
})
)

export const master_salariesRelations = relations(
  schema.master_salaries,
  ({ one, many }) => ({
})
)

export const master_schoolsRelations = relations(
  schema.master_schools,
  ({ one, many }) => ({
})
)

export const master_sub_functionsRelations = relations(
  schema.master_sub_functions,
  ({ one, many }) => ({
})
)

export const master_villagesRelations = relations(
  schema.master_villages,
  ({ one, many }) => ({

    master_districts: one(schema.master_districts, {
      fields: [schema.master_villages.master_district_id],
      references: [schema.master_districts.id],
    }),

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),
})
)

export const membership_packagesRelations = relations(
  schema.membership_packages,
  ({ one, many }) => ({
})
)

export const membershipsRelations = relations(
  schema.memberships,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.memberships.company_id],
      references: [schema.companies.id],
    }),

    opportunities: many(schema.opportunities),

    viewed_users: many(schema.viewed_users),
})
)

export const net_promoter_scoresRelations = relations(
  schema.net_promoter_scores,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.net_promoter_scores.user_id],
      references: [schema.users.id],
    }),
})
)

export const notificationsRelations = relations(
  schema.notifications,
  ({ one, many }) => ({

    erika_user_notification: many(schema.erika_user_notification),
})
)

export const onboarding_notificationsRelations = relations(
  schema.onboarding_notifications,
  ({ one, many }) => ({
})
)

export const opportunitiesRelations = relations(
  schema.opportunities,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.opportunities.company_id],
      references: [schema.companies.id],
    }),

    memberships: one(schema.memberships, {
      fields: [schema.opportunities.membership_id],
      references: [schema.memberships.id],
    }),

    partners: one(schema.partners, {
      fields: [schema.opportunities.partner_id],
      references: [schema.partners.id],
    }),

    apply_logs: many(schema.apply_logs),

    assessments: many(schema.assessments),

    company_hiring_opportunities: many(schema.company_hiring_opportunities),

    company_hiring_users: many(schema.company_hiring_users),

    crp_company_hiring_opportunity_locations: many(schema.crp_company_hiring_opportunity_locations),

    event_opportunities: many(schema.event_opportunities),

    fraud_reports: many(schema.fraud_reports),

    interview_answers: many(schema.interview_answers),

    interview_questions: many(schema.interview_questions),

    invitations: many(schema.invitations),

    log_alerts: many(schema.log_alerts),

    opportunities_recommendations: many(schema.opportunities_recommendations),

    opportunity_branches: many(schema.opportunity_branches),

    opportunity_interview_details: many(schema.opportunity_interview_details),

    opportunity_maps: many(schema.opportunity_maps),

    opportunity_match_systems: many(schema.opportunity_match_systems),

    opportunity_translations: many(schema.opportunity_translations),

    report_abuses: many(schema.report_abuses),

    saved_opportunities: many(schema.saved_opportunities),

    selected_opportunities: many(schema.selected_opportunities),

    selected_users: many(schema.selected_users),

    viewed_opportunities: many(schema.viewed_opportunities),
})
)

export const opportunities_recommendationsRelations = relations(
  schema.opportunities_recommendations,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.opportunities_recommendations.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunities_recommendations.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const opportunity_branchesRelations = relations(
  schema.opportunity_branches,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunity_branches.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const opportunity_interview_detailsRelations = relations(
  schema.opportunity_interview_details,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunity_interview_details.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const opportunity_mapsRelations = relations(
  schema.opportunity_maps,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunity_maps.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const opportunity_match_systemsRelations = relations(
  schema.opportunity_match_systems,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunity_match_systems.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const opportunity_translationsRelations = relations(
  schema.opportunity_translations,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.opportunity_translations.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const ordersRelations = relations(
  schema.orders,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.orders.company_id],
      references: [schema.companies.id],
    }),

    users: one(schema.users, {
      fields: [schema.orders.user_id],
      references: [schema.users.id],
    }),

    billing_infos: many(schema.billing_infos),
})
)

export const organization_experiencesRelations = relations(
  schema.organization_experiences,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.organization_experiences.user_id],
      references: [schema.users.id],
    }),
})
)

export const otp_tokensRelations = relations(
  schema.otp_tokens,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.otp_tokens.user_id],
      references: [schema.users.id],
    }),
})
)

export const participant_companiesRelations = relations(
  schema.participant_companies,
  ({ one, many }) => ({

    expo_participant_companies: many(schema.expo_participant_companies),
})
)

export const partnersRelations = relations(
  schema.partners,
  ({ one, many }) => ({

    opportunities: many(schema.opportunities),
})
)

export const payment_logsRelations = relations(
  schema.payment_logs,
  ({ one, many }) => ({

    payments: one(schema.payments, {
      fields: [schema.payment_logs.payment_id],
      references: [schema.payments.id],
    }),
})
)

export const paymentsRelations = relations(
  schema.payments,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.payments.user_id],
      references: [schema.users.id],
    }),

    payment_logs: many(schema.payment_logs),

    user_memberships: many(schema.user_memberships),
})
)

export const product_inquiriesRelations = relations(
  schema.product_inquiries,
  ({ one, many }) => ({
})
)

export const referral_lottery_winnersRelations = relations(
  schema.referral_lottery_winners,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.referral_lottery_winners.user_id],
      references: [schema.users.id],
    }),
})
)

export const referral_redeem_transactionsRelations = relations(
  schema.referral_redeem_transactions,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.referral_redeem_transactions.user_id],
      references: [schema.users.id],
    }),
})
)

export const report_abusesRelations = relations(
  schema.report_abuses,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.report_abuses.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.report_abuses.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const resume_completionsRelations = relations(
  schema.resume_completions,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.resume_completions.user_id],
      references: [schema.users.id],
    }),
})
)

export const salary_benchmarksRelations = relations(
  schema.salary_benchmarks,
  ({ one, many }) => ({
})
)

export const salary_comparison_resultsRelations = relations(
  schema.salary_comparison_results,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.salary_comparison_results.user_id],
      references: [schema.users.id],
    }),
})
)

export const salary_predictionsRelations = relations(
  schema.salary_predictions,
  ({ one, many }) => ({
})
)

export const saved_opportunitiesRelations = relations(
  schema.saved_opportunities,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.saved_opportunities.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.saved_opportunities.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const schema_migrationsRelations = relations(
  schema.schema_migrations,
  ({ one, many }) => ({
})
)

export const selected_opportunitiesRelations = relations(
  schema.selected_opportunities,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.selected_opportunities.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.selected_opportunities.opportunity_id],
      references: [schema.opportunities.id],
    }),

    assessment_answers: many(schema.assessment_answers),

    selected_opportunity_branches: many(schema.selected_opportunity_branches),
})
)

export const selected_opportunity_branchesRelations = relations(
  schema.selected_opportunity_branches,
  ({ one, many }) => ({

    selected_opportunities: one(schema.selected_opportunities, {
      fields: [schema.selected_opportunity_branches.selected_opportunity_id],
      references: [schema.selected_opportunities.id],
    }),
})
)

export const selected_usersRelations = relations(
  schema.selected_users,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.selected_users.company_id],
      references: [schema.companies.id],
    }),

    users: one(schema.users, {
      fields: [schema.selected_users.user_id],
      references: [schema.users.id],
    }),

    opportunities: one(schema.opportunities, {
      fields: [schema.selected_users.opportunity_id],
      references: [schema.opportunities.id],
    }),
})
)

export const sent_notificationsRelations = relations(
  schema.sent_notifications,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.sent_notifications.user_id],
      references: [schema.users.id],
    }),
})
)

export const skillsRelations = relations(
  schema.skills,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.skills.user_id],
      references: [schema.users.id],
    }),
})
)

export const spatial_ref_sysRelations = relations(
  schema.spatial_ref_sys,
  ({ one, many }) => ({
})
)

export const speakersRelations = relations(
  schema.speakers,
  ({ one, many }) => ({
})
)

export const subscriptionsRelations = relations(
  schema.subscriptions,
  ({ one, many }) => ({
})
)

export const supportsRelations = relations(
  schema.supports,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.supports.user_id],
      references: [schema.users.id],
    }),
})
)

export const templatesRelations = relations(
  schema.templates,
  ({ one, many }) => ({
})
)

export const temporary_usersRelations = relations(
  schema.temporary_users,
  ({ one, many }) => ({
})
)

export const test_readRelations = relations(
  schema.test_read,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.test_read.user_id],
      references: [schema.users.id],
    }),
})
)

export const tmp_table_job_kobus_ptRelations = relations(
  schema.tmp_table_job_kobus_pt,
  ({ one, many }) => ({
})
)

export const tmp_table_kobus_ptRelations = relations(
  schema.tmp_table_kobus_pt,
  ({ one, many }) => ({
})
)

export const user_company_subscriptionsRelations = relations(
  schema.user_company_subscriptions,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_company_subscriptions.user_id],
      references: [schema.users.id],
    }),

    companies: one(schema.companies, {
      fields: [schema.user_company_subscriptions.company_id],
      references: [schema.companies.id],
    }),
})
)

export const user_device_historiesRelations = relations(
  schema.user_device_histories,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_device_histories.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_devicesRelations = relations(
  schema.user_devices,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_devices.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_egtcsRelations = relations(
  schema.user_egtcs,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_egtcs.user_id],
      references: [schema.users.id],
    }),

    egtcs: one(schema.egtcs, {
      fields: [schema.user_egtcs.egtc_id],
      references: [schema.egtcs.id],
    }),
})
)

export const user_eventsRelations = relations(
  schema.user_events,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_events.user_id],
      references: [schema.users.id],
    }),

    events: one(schema.events, {
      fields: [schema.user_events.event_id],
      references: [schema.events.id],
    }),
})
)

export const user_journalsRelations = relations(
  schema.user_journals,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_journals.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_master_job_function_preferencesRelations = relations(
  schema.user_master_job_function_preferences,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_master_job_function_preferences.user_id],
      references: [schema.users.id],
    }),

    master_job_functions: one(schema.master_job_functions, {
      fields: [schema.user_master_job_function_preferences.master_job_function_id],
      references: [schema.master_job_functions.id],
    }),
})
)

export const user_master_location_preferencesRelations = relations(
  schema.user_master_location_preferences,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_master_location_preferences.user_id],
      references: [schema.users.id],
    }),

    master_locations: one(schema.master_locations, {
      fields: [schema.user_master_location_preferences.master_location_id],
      references: [schema.master_locations.id],
    }),
})
)

export const user_membershipsRelations = relations(
  schema.user_memberships,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_memberships.user_id],
      references: [schema.users.id],
    }),

    payments: one(schema.payments, {
      fields: [schema.user_memberships.payment_id],
      references: [schema.payments.id],
    }),
})
)

export const user_notificationRelations = relations(
  schema.user_notification,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_notification.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_phone_verificationsRelations = relations(
  schema.user_phone_verifications,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_phone_verifications.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_portofolioRelations = relations(
  schema.user_portofolio,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_portofolio.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_preferencesRelations = relations(
  schema.user_preferences,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_preferences.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_profile_referralsRelations = relations(
  schema.user_profile_referrals,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_profile_referrals.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_profilesRelations = relations(
  schema.user_profiles,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_profiles.user_id],
      references: [schema.users.id],
    }),

    master_districts: one(schema.master_districts, {
      fields: [schema.user_profiles.master_district_id],
      references: [schema.master_districts.id],
    }),

    master_villages: one(schema.master_villages, {
      fields: [schema.user_profiles.master_village_id],
      references: [schema.master_villages.id],
    }),

    master_countries: one(schema.master_countries, {
      fields: [schema.user_profiles.master_country_id],
      references: [schema.master_countries.id],
    }),

    master_provinces: one(schema.master_provinces, {
      fields: [schema.user_profiles.master_province_id],
      references: [schema.master_provinces.id],
    }),

    master_regencies: one(schema.master_regencies, {
      fields: [schema.user_profiles.master_regency_id],
      references: [schema.master_regencies.id],
    }),
})
)

export const user_profiles_20231212Relations = relations(
  schema.user_profiles_20231212,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_profiles_20231212.user_id],
      references: [schema.users.id],
    }),

    master_districts: one(schema.master_districts, {
      fields: [schema.user_profiles_20231212.master_district_id],
      references: [schema.master_districts.id],
    }),

    master_villages: one(schema.master_villages, {
      fields: [schema.user_profiles_20231212.master_village_id],
      references: [schema.master_villages.id],
    }),

    master_countries: one(schema.master_countries, {
      fields: [schema.user_profiles_20231212.master_country_id],
      references: [schema.master_countries.id],
    }),

    master_provinces: one(schema.master_provinces, {
      fields: [schema.user_profiles_20231212.master_province_id],
      references: [schema.master_provinces.id],
    }),

    master_regencies: one(schema.master_regencies, {
      fields: [schema.user_profiles_20231212.master_regency_id],
      references: [schema.master_regencies.id],
    }),
})
)

export const user_referralsRelations = relations(
  schema.user_referrals,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.user_referrals.user_id],
      references: [schema.users.id],
    }),
})
)

export const user_resumesRelations = relations(
  schema.user_resumes,
  ({ one, many }) => ({
})
)

export const usersRelations = relations(
  schema.users,
  ({ one, many }) => ({

    ad_trackers: many(schema.ad_trackers),

    admin_authentications: many(schema.admin_authentications),

    apply_logs: many(schema.apply_logs),

    audits: many(schema.audits),

    auto_apply_log: many(schema.auto_apply_log),

    billing_infos: many(schema.billing_infos),

    candidate_notifications: many(schema.candidate_notifications),

    certifications: many(schema.certifications),

    communication_test_informations: many(schema.communication_test_informations),

    companies: many(schema.companies),

    company_filters: many(schema.company_filters),

    company_hiring_users: many(schema.company_hiring_users),

    company_users: many(schema.company_users),

    crp_caller_users: many(schema.crp_caller_users),

    educations: many(schema.educations),

    efset_results: many(schema.efset_results),

    fraud_reports: many(schema.fraud_reports),

    hiring_documents: many(schema.hiring_documents),

    identities: many(schema.identities),

    intelligence_test_informations: many(schema.intelligence_test_informations),

    interest_test_informations: many(schema.interest_test_informations),

    interview_answers: many(schema.interview_answers),

    invitations: many(schema.invitations),

    invited_emails: many(schema.invited_emails),

    job_alert_email_template_last_sents: many(schema.job_alert_email_template_last_sents),

    job_alert_options: many(schema.job_alert_options),

    jobs_recommendations: many(schema.jobs_recommendations),

    language_proficiencies: many(schema.language_proficiencies),

    log_alerts: many(schema.log_alerts),

    marked_users: many(schema.marked_users),

    net_promoter_scores: many(schema.net_promoter_scores),

    opportunities_recommendations: many(schema.opportunities_recommendations),

    orders: many(schema.orders),

    organization_experiences: many(schema.organization_experiences),

    otp_tokens: many(schema.otp_tokens),

    payments: many(schema.payments),

    referral_lottery_winners: many(schema.referral_lottery_winners),

    referral_redeem_transactions: many(schema.referral_redeem_transactions),

    report_abuses: many(schema.report_abuses),

    resume_completions: many(schema.resume_completions),

    salary_comparison_results: many(schema.salary_comparison_results),

    saved_opportunities: many(schema.saved_opportunities),

    selected_opportunities: many(schema.selected_opportunities),

    selected_users: many(schema.selected_users),

    sent_notifications: many(schema.sent_notifications),

    skills: many(schema.skills),

    supports: many(schema.supports),

    test_read: many(schema.test_read),

    user_company_subscriptions: many(schema.user_company_subscriptions),

    user_device_histories: many(schema.user_device_histories),

    user_devices: many(schema.user_devices),

    user_egtcs: many(schema.user_egtcs),

    user_events: many(schema.user_events),

    user_journals: many(schema.user_journals),

    user_master_job_function_preferences: many(schema.user_master_job_function_preferences),

    user_master_location_preferences: many(schema.user_master_location_preferences),

    user_memberships: many(schema.user_memberships),

    user_notification: many(schema.user_notification),

    user_phone_verifications: many(schema.user_phone_verifications),

    user_portofolio: many(schema.user_portofolio),

    user_preferences: many(schema.user_preferences),

    user_profile_referrals: many(schema.user_profile_referrals),

    user_profiles: many(schema.user_profiles),

    user_profiles_20231212: many(schema.user_profiles_20231212),

    user_referrals: many(schema.user_referrals),

    users_filter: many(schema.users_filter),

    viewed_opportunities: many(schema.viewed_opportunities),

    viewed_users: many(schema.viewed_users),

    work_experiences: many(schema.work_experiences),
})
)

export const users_filterRelations = relations(
  schema.users_filter,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.users_filter.user_id],
      references: [schema.users.id],
    }),
})
)

export const versionsRelations = relations(
  schema.versions,
  ({ one, many }) => ({
})
)

export const viewed_opportunitiesRelations = relations(
  schema.viewed_opportunities,
  ({ one, many }) => ({

    opportunities: one(schema.opportunities, {
      fields: [schema.viewed_opportunities.opportunity_id],
      references: [schema.opportunities.id],
    }),

    users: one(schema.users, {
      fields: [schema.viewed_opportunities.user_id],
      references: [schema.users.id],
    }),
})
)

export const viewed_usersRelations = relations(
  schema.viewed_users,
  ({ one, many }) => ({

    companies: one(schema.companies, {
      fields: [schema.viewed_users.company_id],
      references: [schema.companies.id],
    }),

    users: one(schema.users, {
      fields: [schema.viewed_users.user_id],
      references: [schema.users.id],
    }),

    memberships: one(schema.memberships, {
      fields: [schema.viewed_users.membership_id],
      references: [schema.memberships.id],
    }),
})
)

export const whatsapp_job_preferenceRelations = relations(
  schema.whatsapp_job_preference,
  ({ one, many }) => ({
})
)

export const work_experiencesRelations = relations(
  schema.work_experiences,
  ({ one, many }) => ({

    users: one(schema.users, {
      fields: [schema.work_experiences.user_id],
      references: [schema.users.id],
    }),

    companies: one(schema.companies, {
      fields: [schema.work_experiences.company_id],
      references: [schema.companies.id],
    }),
})
)

export const workshop_eventRelations = relations(
  schema.workshop_event,
  ({ one, many }) => ({

    events: one(schema.events, {
      fields: [schema.workshop_event.event_id],
      references: [schema.events.id],
    }),

    workshops: one(schema.workshops, {
      fields: [schema.workshop_event.workshop_id],
      references: [schema.workshops.id],
    }),
})
)

export const workshopsRelations = relations(
  schema.workshops,
  ({ one, many }) => ({

    workshop_event: many(schema.workshop_event),
})
)