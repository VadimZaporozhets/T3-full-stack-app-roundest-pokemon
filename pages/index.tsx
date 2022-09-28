import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 justify-between items-center max-w-2xl flex">
        <div className="w-16 h-16 bg-purple-300"></div>
        <div className="p-8">VS</div>
        <div className="w-16 h-16 bg-purple-300"></div>
      </div>
    </div>
  )
}

export default Home
