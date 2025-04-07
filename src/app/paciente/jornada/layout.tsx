export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="pt">
        <body>
          <main >{children}</main> {/* Aqui as rotas serão renderizadas */}
          <div>Camera</div>
        </body>
      </html>
    );
  }
  