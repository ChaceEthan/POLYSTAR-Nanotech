import mongoose, { Schema, type Model } from "mongoose";

const localizedField: Record<string, any> = {
  en: String,
  rw: String,
  fr: String,
  zh: String,
  ru: String,
  hi: String,
  ur: String,
  sw: String
};

const contentSchemaDefinition: Record<string, any> = {
  title: { type: String, trim: true, index: true },
  name: { type: String, trim: true, index: true },
  slug: { type: String, trim: true, index: true },
  summary: String,
  description: String,
  category: { type: String, trim: true, index: true },
  industry: { type: String, trim: true, index: true },
  location: String,
  client: String,
  imageUrl: String,
  videoUrl: String,
  attachments: [String],
  tags: [String],
  status: {
    type: String,
    enum: ["draft", "active", "archived", "closed", "published", "pending"],
    default: "draft",
    index: true
  },
  locale: { type: String, default: "en", index: true },
  translations: localizedField,
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" }
};

function createContentModel(name: string, collection: string): Model<any> {
  const schema = new Schema(contentSchemaDefinition, {
    timestamps: true,
    collection,
    strict: false
  });

  schema.index({ title: "text", name: "text", summary: "text", description: "text" });
  schema.index({ slug: 1, locale: 1 }, { unique: false });

  return (mongoose.models[name] as Model<any>) || mongoose.model(name, schema);
}

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    company: String,
    phone: String,
    role: { type: String, enum: ["super_admin", "admin", "editor", "partner", "client"], default: "client", index: true },
    permissions: { type: [String], default: [] },
    status: { type: String, default: "active", index: true },
    lastLoginAt: Date,
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "users" }
);
userSchema.index({ role: 1, status: 1 });

const roleSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    permissions: { type: [String], default: [] },
    status: { type: String, default: "active" },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "roles" }
);

const permissionSchema = new Schema(
  {
    title: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resource: { type: String, required: true, index: true },
    description: String,
    status: { type: String, default: "active" }
  },
  { timestamps: true, collection: "permissions" }
);
permissionSchema.index({ action: 1, resource: 1 }, { unique: true });

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    subject: String,
    message: String,
    preferredLanguage: String,
    status: { type: String, default: "pending", index: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "contacts" }
);
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

const requestSchema = new Schema(
  {
    name: String,
    email: { type: String, index: true },
    phone: String,
    company: String,
    service: String,
    projectScope: String,
    preferredDate: Date,
    location: String,
    budget: String,
    message: String,
    status: { type: String, default: "pending", index: true },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, strict: false }
);

const supportTicketSchema = new Schema(
  {
    subject: { type: String, required: true, index: true },
    message: { type: String, required: true },
    requester: { type: Schema.Types.ObjectId, ref: "User", index: true },
    priority: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
    status: { type: String, enum: ["open", "pending", "closed"], default: "open", index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    attachments: [String],
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "support_tickets" }
);
supportTicketSchema.index({ requester: 1, status: 1, createdAt: -1 });
supportTicketSchema.index({ priority: 1, status: 1 });

const ticketMessageSchema = new Schema(
  {
    ticket: { type: Schema.Types.ObjectId, ref: "SupportTicket", required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    attachments: [String],
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "ticket_messages" }
);
ticketMessageSchema.index({ ticket: 1, createdAt: 1 });

const notificationSchema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId, ref: "User", index: true },
    title: { type: String, required: true },
    message: String,
    channel: { type: String, default: "in_app" },
    readAt: Date,
    status: { type: String, default: "active" },
    metadata: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "notifications" }
);
notificationSchema.index({ recipient: 1, readAt: 1, createdAt: -1 });

const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true, index: true },
    revokedAt: Date,
    replacedByTokenHash: String,
    userAgent: String,
    ipAddress: String
  },
  { timestamps: true, collection: "refresh_tokens" }
);
refreshTokenSchema.index({ user: 1, revokedAt: 1 });

const settingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Schema.Types.Mixed, default: null },
    group: { type: String, default: "general", index: true },
    isPublic: { type: Boolean, default: false, index: true },
    description: String,
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, collection: "settings" }
);
settingSchema.index({ isPublic: 1, group: 1 });

const translationSchema = new Schema(
  {
    key: { type: String, required: true, trim: true },
    locale: { type: String, required: true, trim: true, index: true },
    namespace: { type: String, default: "common", index: true },
    value: { type: String, required: true },
    status: { type: String, enum: ["draft", "active", "archived"], default: "active", index: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, collection: "translations" }
);
translationSchema.index({ locale: 1, namespace: 1, key: 1 }, { unique: true });

const analyticsEventSchema = new Schema(
  {
    event: { type: String, required: true, index: true },
    path: { type: String, index: true },
    locale: { type: String, default: "en", index: true },
    user: { type: Schema.Types.ObjectId, ref: "User", index: true },
    sessionId: { type: String, index: true },
    ipAddress: String,
    userAgent: String,
    properties: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true, collection: "analytics_events" }
);
analyticsEventSchema.index({ event: 1, createdAt: -1 });
analyticsEventSchema.index({ path: 1, createdAt: -1 });

export const UserModel = (mongoose.models.User as Model<any>) || mongoose.model("User", userSchema);
export const AdminModel = createContentModel("Admin", "admins");
export const RoleModel = (mongoose.models.Role as Model<any>) || mongoose.model("Role", roleSchema);
export const PermissionModel = (mongoose.models.Permission as Model<any>) || mongoose.model("Permission", permissionSchema);
export const ServiceModel = createContentModel("Service", "services");
export const ProjectModel = createContentModel("Project", "projects");
export const PortfolioModel = createContentModel("Portfolio", "portfolio");
export const CaseStudyModel = createContentModel("CaseStudy", "case_studies");
export const TestimonialModel = createContentModel("Testimonial", "testimonials");
export const PartnerModel = createContentModel("Partner", "partners");
export const BlogPostModel = createContentModel("BlogPost", "blog_posts");
export const DownloadModel = createContentModel("Download", "downloads");
export const CareerModel = createContentModel("Career", "careers");
export const QuotationModel = (mongoose.models.Quotation as Model<any>) || mongoose.model("Quotation", requestSchema.clone().set("collection", "quotations"));
export const ConsultationModel = (mongoose.models.Consultation as Model<any>) || mongoose.model("Consultation", requestSchema.clone().set("collection", "consultations"));
export const SiteVisitModel = (mongoose.models.SiteVisit as Model<any>) || mongoose.model("SiteVisit", requestSchema.clone().set("collection", "site_visits"));
export const ContactModel = (mongoose.models.Contact as Model<any>) || mongoose.model("Contact", contactSchema);
export const GalleryModel = createContentModel("Gallery", "gallery");
export const VideoModel = createContentModel("Video", "videos");
export const DocumentModel = createContentModel("Document", "documents");
export const SettingModel = (mongoose.models.Setting as Model<any>) || mongoose.model("Setting", settingSchema);
export const TranslationModel = (mongoose.models.Translation as Model<any>) || mongoose.model("Translation", translationSchema);
export const SupportTicketModel = (mongoose.models.SupportTicket as Model<any>) || mongoose.model("SupportTicket", supportTicketSchema);
export const TicketMessageModel = (mongoose.models.TicketMessage as Model<any>) || mongoose.model("TicketMessage", ticketMessageSchema);
export const ClientModel = createContentModel("Client", "clients");
export const ReportModel = createContentModel("Report", "reports");
export const NotificationModel = (mongoose.models.Notification as Model<any>) || mongoose.model("Notification", notificationSchema);
export const RefreshTokenModel = (mongoose.models.RefreshToken as Model<any>) || mongoose.model("RefreshToken", refreshTokenSchema);
export const AnalyticsEventModel = (mongoose.models.AnalyticsEvent as Model<any>) || mongoose.model("AnalyticsEvent", analyticsEventSchema);

// Settings and translations use dedicated schemas for key/locale uniqueness.
export const modelRegistry = {
  users: UserModel,
  admins: AdminModel,
  roles: RoleModel,
  permissions: PermissionModel,
  services: ServiceModel,
  projects: ProjectModel,
  portfolio: PortfolioModel,
  case_studies: CaseStudyModel,
  testimonials: TestimonialModel,
  partners: PartnerModel,
  blog_posts: BlogPostModel,
  downloads: DownloadModel,
  careers: CareerModel,
  quotations: QuotationModel,
  consultations: ConsultationModel,
  site_visits: SiteVisitModel,
  contacts: ContactModel,
  gallery: GalleryModel,
  videos: VideoModel,
  documents: DocumentModel,
  settings: SettingModel,
  translations: TranslationModel,
  support_tickets: SupportTicketModel,
  ticket_messages: TicketMessageModel,
  clients: ClientModel,
  reports: ReportModel,
  notifications: NotificationModel,
  refresh_tokens: RefreshTokenModel,
  analytics_events: AnalyticsEventModel
} as const;
