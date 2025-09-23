export default function page() {
  return (
    <div>
      <h1>CV</h1>
      <p>This is the CV page.</p>
      <p>PDF preview</p>
      <iframe
        src="/Rasyid-Abqari-Hasibuan-CV.pdf"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
        title="CV PDF"
      ></iframe>
    </div>
  )
}