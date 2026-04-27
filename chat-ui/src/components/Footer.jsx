function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {year} SimpleBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;