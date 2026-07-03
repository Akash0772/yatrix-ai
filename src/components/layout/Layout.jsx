import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, onChatOpen }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onChatOpen={onChatOpen} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout