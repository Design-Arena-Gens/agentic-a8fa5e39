export const metadata = {
  title: "Agent IA Make ? G?n?rateur de sc?narios",
  description: "G?n?rez des sc?narios Make avec des ?tapes IA ? partir d'un prompt."
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
