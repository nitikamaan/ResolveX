export default function ErrorPage() {
  return (
    <div className="container">
      <h2>404 - Page Not Found</h2>
      <button onClick={()=>window.location.href="/"}>
        Go Home
      </button>
    </div>
  );
}