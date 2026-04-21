import "./globals.css";
import { AuthProvider } from "./providers";

export const metadata = {
  title: "Kibir.love",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}