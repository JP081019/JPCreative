import { LegalPage } from "../components/LegalPage";
import { legalDocuments } from "../data/legal";
import { pageMetadata } from "../lib/metadata";
const document = legalDocuments.cookies;
export const metadata = { ...pageMetadata(document.title.replace(/\.$/, ""), document.description, document.path), robots: { index: false, follow: true } };
export default function CookiesPage() { return <LegalPage document={document} />; }
