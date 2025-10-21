"use client"
import { useAuth } from "../hooks/useAuth"
import AuthPage from "../components/authComponents/AuthPage"
import FeatureCard from "../components/landingComponents/FeatureCard"
import AdCard from "../components/landingComponents/AdCard"
import EditorialPickCard from "../components/landingComponents/EditorialPickCard"
import { ArrowRight } from "lucide-react"
import PopularFeatures from "../components/landingComponents/PopularFeatures"
import Philosophy from "../components/landingComponents/Philosphy"
import CTA from "../components/landingComponents/CTA"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <p className="text-lg text-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {/* Hero Section */}
          <section className="mb-20 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
              <h2 className="text-5xl sm:text-6xl lg:text-[80px] font-outfit italic tracking-tight px-6 text-shadow-md  ">
                Best of the Week
              </h2>
              <button
                onClick={() => navigate('/community')}
                className="hidden md:flex items-center gap-2 text-base font-outfit italic text-foreground hover:text-muted-foreground transition-all duration-300 group"
              >
                See all posts
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Large Feature Card - spans 2 columns and full height */}
              <div className="lg:col-span-2 lg:row-span-2">
                <FeatureCard
                  date="Sep 06, 2022"
                  category="Travel"
                  title="Get to your dream destinations with Travel Pro"
                  image="./hero-travel.jpg"
                  className="h-[520px] lg:h-full"
                />
              </div>

              {/* Ad Card - top right */}
              <div>
                <AdCard />
              </div>

              {/* Editorial Pick Card - bottom right */}
              <div>
                <EditorialPickCard image="/editorial-fashion.jpg" count={24} />
              </div>
            </div>

            {/* Mobile CTA */}
            <button
              onClick={() => navigate('/community')}
              className="md:hidden mt-10 flex items-center gap-2 text-base font-medium text-foreground hover:text-muted-foreground transition-all duration-300 group"
            >
              See all posts
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </section>
        </div>
      </main>
      <PopularFeatures/>
      <Philosophy/>
      <CTA/>
    </div>
  )
}

export default Home
