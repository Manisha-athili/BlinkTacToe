

const App = () => {

  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<CategorySelection />} />
        <Route path="/game" element={<GamePlay />} />
      </Routes>
    </Router>
    </>
  )
}

export default App