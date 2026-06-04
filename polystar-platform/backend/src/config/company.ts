import { env } from "./env.js";

export const companyConfig = {
  appName: env.APP_NAME,
  name: env.COMPANY_NAME,
  phone: env.COMPANY_PHONE,
  email: env.COMPANY_EMAIL,
  location: env.COMPANY_LOCATION,
  managingDirector: env.MANAGING_DIRECTOR,
  adminEmail: env.ADMIN_EMAIL,
  qrCompanyProfileUrl: env.QR_COMPANY_PROFILE_URL
};
