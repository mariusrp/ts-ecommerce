export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Automate Hub. All rights reserved.
        </p>
        <p>Creator: Marius Phillips</p>
      </div>
    </footer>
  )
}
