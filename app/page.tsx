'use client'

import { useState, useEffect } from 'react'
import { Copy, Share2, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Excuse categories and data
const excuseCategories = {
  'all': 'All Categories',
  'technology': 'Technology Fails',
  'rebellion': 'Object Rebellion', 
  'disasters': 'Unexpected Disasters',
  'timetravel': 'Time Travel Mishaps'
}

const excuses = {
  technology: [
    "My WiFi joined a rival college and refuses to work for me anymore.",
    "Google Docs autocorrected my entire essay into a rap song about vegetables.",
    "My laptop developed trust issues after I called it slow last week.",
    "Autocorrect changed my thesis statement to 'I love pizza' 47 times.",
    "My computer caught a virus from watching too many cat videos.",
    "Microsoft Word decided to translate my assignment into ancient hieroglyphics.",
    "My phone's AI assistant submitted my grocery list instead of my essay.",
    "The cloud storage got confused and saved my assignment in actual clouds.",
    "My keyboard keys rearranged themselves alphabetically while I was sleeping.",
    "Siri misheard me and submitted a recipe for banana bread instead.",
    "My USB drive went on a spiritual journey and hasn't returned yet.",
    "The internet connection at my house is protesting against homework.",
    "My computer's spell check had an existential crisis and quit mid-sentence.",
    "Adobe crashed so hard it took my motivation with it.",
    "My laptop screen started displaying everything in Comic Sans as a cry for help.",
    "The WiFi password changed itself to 'DoYourHomework123' and I refuse to type it.",
    "My computer blue-screened when it realized how bad my essay was.",
    "Google Drive synchronized my assignment with a parallel universe where I'm a chef.",
    "My phone autocorrected 'assignment' to 'ice cream' in every email to professors.",
    "The printer gained consciousness and decided my work wasn't worth the ink.",
    "My laptop joined a union and is demanding better working conditions.",
    "Zoom ate my homework during a virtual class presentation.",
    "My computer's antivirus flagged my assignment as 'potentially boring content.'",
    "The internet router is having an identity crisis and thinks it's a toaster.",
    "My smartphone got jealous of my laptop and deleted all my files out of spite."
  ],
  rebellion: [
    "My pen went on strike demanding better ink and working conditions.",
    "My textbooks formed a union and are refusing to open until their demands are met.",
    "My backpack zipped itself shut and won't let me access my homework.",
    "The stapler has been holding my pages hostage for three days now.",
    "My calculator started giving me philosophical answers instead of mathematical ones.",
    "My notebook pages are blank because they're protesting against my handwriting.",
    "My highlighters went on a color strike and only work in beige now.",
    "The eraser on my pencil quit its job and left a tiny resignation letter.",
    "My ruler measured everything in 'feelings' instead of inches.",
    "My scissors decided to become safety scissors and won't cut anything important.",
    "My desk lamp is giving me the silent treatment after I called it dim.",
    "My chair keeps spinning away every time I try to sit down to work.",
    "My coffee mug refuses to hold coffee until I finish my assignments first.",
    "The hole puncher has developed commitment issues and won't make clean holes.",
    "My binder clips are practicing civil disobedience and won't stay clipped.",
    "My pencil sharpener is only producing wood shavings shaped like tiny protests signs.",
    "My whiteboard markers dried up in solidarity with my lack of motivation.",
    "The paper clips linked themselves into a chain and blocked my desk drawer.",
    "My sticky notes lost their stickiness and are now just 'notes.'",
    "My bookmark abandoned my textbook and ran away to join a romance novel.",
    "The three-hole punch is only making two holes as an act of rebellion.",
    "My mechanical pencil lead keeps breaking because it's emotionally fragile.",
    "My folder tabs rearranged themselves into inappropriate words.",
    "The correction tape formed a union with the white-out and they're both on strike.",
    "My desk organizer reorganized itself into chaos while I was sleeping."
  ],
  disasters: [
    "A family of raccoons moved into my backpack and claimed my homework as nesting material.",
    "My neighbor's pet parrot kept giving me wrong answers through the window.",
    "A tornado made entirely of glitter hit my study room.",
    "My cat learned to type and submitted a 10-page essay about the superiority of tuna.",
    "A flash mob of squirrels invaded my yard and stole all my research notes.",
    "My house was temporarily converted into a reality TV show set without my knowledge.",
    "A meteor shower, but instead of rocks, it was raining expired coupons on my roof.",
    "My goldfish developed telepathic powers and kept distracting me with fish thoughts.",
    "A mariachi band got lost and ended up practicing in my backyard for 6 hours.",
    "My houseplants staged an intervention about my procrastination habits.",
    "A flock of flamingos landed in my pool and refused to leave until I fed them.",
    "My refrigerator started humming opera so loudly I couldn't concentrate.",
    "A traveling circus elephant escaped and is currently living in my garage.",
    "My shadow gained independence and went to do its own homework instead.",
    "A group of time-traveling Vikings appeared in my living room asking for WiFi passwords.",
    "My ceiling fan developed a gambling addiction and kept betting against my success.",
    "A family of bears moved into my attic and they're very loud neighbors.",
    "My doorbell started playing death metal every time someone approached the house.",
    "A rainbow appeared in my room but it was blocking my computer screen.",
    "My alarm clock gained sentience and decided to sleep in instead of waking me up.",
    "A parade of lost delivery trucks has been circling my house for three days.",
    "My houseplants formed a book club and they're very judgmental about my reading choices.",
    "A group of professional mimes got trapped in my yard and their silent screaming is distracting.",
    "My microwave started receiving radio signals from a distant planet with very catchy music.",
    "A family of penguins moved into my freezer and they're surprisingly good at small talk."
  ],
  timetravel: [
    "I accidentally submitted my assignment to the wrong century - it's currently being graded in 1823.",
    "My future self came back to warn me not to turn in this assignment, so I didn't.",
    "I got stuck in a time loop where every time I finish my homework, the day resets.",
    "My assignment traveled back to the Renaissance and is now hanging in the Louvre.",
    "I sent my homework through a wormhole but it ended up in the Jurassic period.",
    "My past self borrowed my assignment and never returned it.",
    "I accidentally wrote my assignment in future tense and it hasn't happened yet.",
    "My homework got caught in a temporal paradox and now exists in all timelines except this one.",
    "I submitted my assignment yesterday, but yesterday hasn't happened yet due to time dilation.",
    "My assignment is currently stuck in the year 3021 helping robots with their homework.",
    "I wrote my essay about the future, but the future changed and now it's historically inaccurate.",
    "My homework traveled to ancient Egypt and is now part of a hieroglyphic translation project.",
    "I accidentally created a time rift while procrastinating and my assignment fell through it.",
    "My assignment went back in time and convinced my past self not to write it.",
    "I'm waiting for my future self to come back and tell me what grade I got before I submit it.",
    "My homework got stuck in the 1960s and is currently at Woodstock.",
    "I sent my assignment to next week, but next week sent it back with a note saying 'not ready yet.'",
    "My essay about history became actual history and is now in a museum.",
    "I accidentally wrote my assignment in the wrong timeline where the assignment was due next month.",
    "My homework traveled to the Wild West and is currently wanted by time sheriffs.",
    "I submitted my assignment to the future, but they said it's outdated technology.",
    "My essay got caught in a time storm and is now scattered across multiple decades.",
    "I wrote my assignment about time travel and it literally traveled through time to prove its point.",
    "My homework went back to fix historical errors and is still working on the Renaissance.",
    "I accidentally created a temporal loop where my assignment keeps submitting itself to different professors throughout history."
  ]
}

export default function AssignmentExcuseGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentExcuse, setCurrentExcuse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateExcuse = () => {
    setIsLoading(true)
    
    // Fun loading delay
    setTimeout(() => {
      let availableExcuses = []
      
      if (selectedCategory === 'all') {
        availableExcuses = [
          ...excuses.technology,
          ...excuses.rebellion,
          ...excuses.disasters,
          ...excuses.timetravel
        ]
      } else {
        availableExcuses = excuses[selectedCategory] || []
      }
      
      const randomExcuse = availableExcuses[Math.floor(Math.random() * availableExcuses.length)]
      setCurrentExcuse(randomExcuse)
      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentExcuse)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`My assignment excuse: "${currentExcuse}" 😅`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(`My assignment excuse: "${currentExcuse}" 😅 #AssignmentExcuses #StudentLife`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const shareToInstagram = () => {
    // Instagram doesn't have direct text sharing, so we'll copy to clipboard with a message
    copyToClipboard()
    alert('Excuse copied to clipboard! You can now paste it in your Instagram story or post 📱')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-4" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", cursive' }}>
            Assignment Excuse Generator
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Generate the most absurd yet believable reasons why your assignment is late! 🎭
          </p>
        </div>

        {/* Category Filter */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Choose Your Excuse Category:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(excuseCategories).map(([key, label]) => (
              <Button
                key={key}
                onClick={() => setSelectedCategory(key)}
                variant={selectedCategory === key ? "default" : "outline"}
                className={`h-12 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button
            onClick={generateExcuse}
            disabled={isLoading}
            className="h-16 px-12 text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Generating Excuse...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Generate Excuse!
              </>
            )}
          </Button>
        </div>

        {/* Generated Excuse Display */}
        {currentExcuse && (
          <Card className="p-8 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Excuse:</h3>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium italic">
                "{currentExcuse}"
              </p>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        {currentExcuse && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
            
            <Button
              onClick={shareToWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share on WhatsApp
            </Button>
            
            <Button
              onClick={shareToTwitter}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share on X
            </Button>
            
            <Button
              onClick={shareToInstagram}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share on Instagram
            </Button>
          </div>
        )}

        {/* Fun Stats */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-yellow-200 shadow-xl">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Fun Stats</h3>
            <p className="text-gray-600">
              Over <span className="font-bold text-purple-600">100 creative excuses</span> across 4 hilarious categories!
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Remember: Use these excuses responsibly and maybe actually do your homework too! 😉
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
