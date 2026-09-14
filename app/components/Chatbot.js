"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "919596311857";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const INITIAL_MESSAGE = {
  id: 1,
  from: "bot",
  text: "Hi 👋 Welcome to The Shorewood. I'm here to help you plan your Kashmir journey. What are you looking for?",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState("start");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  function addMessage(from, text) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        from,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }

  async function botReply(text, nextStep = null) {
    setTyping(true);

    // Makes the chatbot feel like someone is actually typing
    const delay = Math.min(
      Math.max(text.length * 18, 700),
      1500
    );

    await sleep(delay);

    setTyping(false);
    addMessage("bot", text);

    if (nextStep) {
      setStep(nextStep);
    }
  }

  async function handleChoice(label, value) {
    addMessage("user", label);

    // -------------------------
    // START
    // -------------------------

    if (value === "plan") {
      await botReply(
        "Lovely. We create private Kashmir journeys around your dates, pace and interests. How long are you thinking of staying?",
        "duration"
      );
      return;
    }

    if (value === "destinations") {
      await botReply(
        "Kashmir has so much beyond the usual route. Srinagar, Gulmarg, Pahalgam and Sonmarg are the classics, while places like Doodhpathri, Yusmarg, Gurez and Bangus offer something quieter.",
        "destination"
      );
      return;
    }

    if (value === "experiences") {
      await botReply(
        "That's what we love most. 🌿 We can arrange quiet mornings on Dal Lake, mountain escapes, Kashmiri cuisine, heritage walks, local experiences and winter days in Gulmarg.",
        "experience"
      );
      return;
    }

    if (value === "stay") {
      await botReply(
        "Of course. We can help you choose a stay that fits your journey, from comfortable hotels to peaceful stays surrounded by Kashmir's landscapes.",
        "stay"
      );
      return;
    }

    if (value === "contact") {
      await botReply(
        "I'd be happy to connect you with our team. WhatsApp is the quickest way to start planning your journey.",
        "contact"
      );
      return;
    }

    // -------------------------
    // DURATION
    // -------------------------

    if (value === "3-4") {
      await botReply(
        "Perfect for a short escape. Srinagar + either Gulmarg or Pahalgam can make a beautiful 3–4 day journey. Which sounds more like you?",
        "shortDestination"
      );
      return;
    }

    if (value === "5-7") {
      await botReply(
        "That's a great amount of time. You can comfortably combine Srinagar, Gulmarg and Pahalgam, with room for a slower day or a special experience.",
        "interests"
      );
      return;
    }

    if (value === "8-10") {
      await botReply(
        "Now we can really slow things down. We could combine the main destinations with quieter valleys and experiences away from the usual tourist route.",
        "interests"
      );
      return;
    }

    if (value === "10+") {
      await botReply(
        "Beautiful. With 10+ days, Kashmir can be experienced at a much slower pace. We can mix the well-known places with quieter destinations and local experiences.",
        "interests"
      );
      return;
    }

    // -------------------------
    // SHORT DESTINATION
    // -------------------------

    if (value === "gulmarg") {
      await botReply(
        "Gulmarg is perfect if you want mountain scenery, meadows and, in winter, snow. ❄️ Would you also like some time around Srinagar?",
        "final"
      );
      return;
    }

    if (value === "pahalgam") {
      await botReply(
        "Pahalgam is wonderful for pine forests, rivers and a slower mountain escape. 🌲 Would you also like some time around Srinagar?",
        "final"
      );
      return;
    }

    // -------------------------
    // INTERESTS
    // -------------------------

    if (value === "nature") {
      await botReply(
        "Then we'd focus on mountains, meadows, rivers and quieter corners of Kashmir. 🌿 We can build the route around scenery rather than rushing between attractions.",
        "final"
      );
      return;
    }

    if (value === "culture") {
      await botReply(
        "Wonderful choice. We can include Srinagar's old city, heritage, Kashmiri craftsmanship, local food and slower cultural experiences.",
        "final"
      );
      return;
    }

    if (value === "luxury") {
      await botReply(
        "Absolutely. We can shape the journey around premium stays, private transfers, personalised experiences and plenty of time to enjoy each place.",
        "final"
      );
      return;
    }

    if (value === "family") {
      await botReply(
        "For families, we'd keep the journey comfortable and flexible, with scenic destinations, manageable travel days and experiences everyone can enjoy.",
        "final"
      );
      return;
    }

    // -------------------------
    // DESTINATION
    // -------------------------

    if (value === "srinagar") {
      await botReply(
        "Srinagar is a beautiful starting point — Dal Lake, Mughal gardens, the old city and Kashmiri culture all in one place.",
        "final"
      );
      return;
    }

    if (value === "mountains") {
      await botReply(
        "Then Pahalgam and Gulmarg should definitely be on your list. Depending on the season, we can also look at quieter mountain destinations.",
        "final"
      );
      return;
    }

    // -------------------------
    // EXPERIENCE
    // -------------------------

    if (value === "lake") {
      await botReply(
        "A private morning on Dal Lake is one of our favourites — quieter water, beautiful light and time to simply enjoy the valley.",
        "final"
      );
      return;
    }

    if (value === "food") {
      await botReply(
        "Kashmiri cuisine is an experience in itself. We can include local flavours, kahwa and authentic food experiences along the journey.",
        "final"
      );
      return;
    }

    if (value === "heritage") {
      await botReply(
        "We can take you beyond the standard sightseeing route and explore Srinagar's heritage, old neighbourhoods and Kashmiri craftsmanship.",
        "final"
      );
      return;
    }

    // -------------------------
    // STAY
    // -------------------------

    if (value === "recommend") {
      await botReply(
        "Tell us your dates and the kind of atmosphere you want — peaceful, luxury, mountain, family-friendly or something unique — and we'll suggest suitable options.",
        "final"
      );
      return;
    }

    // -------------------------
    // FINAL
    // -------------------------

    if (value === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi The Shorewood 👋 I would like to plan a Kashmir journey."
        )}`,
        "_blank"
      );
      return;
    }

    if (value === "book") {
      window.location.href = "/BookATrip";
      return;
    }

    if (value === "restart") {
      setMessages([INITIAL_MESSAGE]);
      setStep("start");
    }
  }

  function getOptions() {
    switch (step) {
      case "start":
        return [
          ["Plan my Kashmir trip", "plan"],
          ["Explore destinations", "destinations"],
          ["Discover experiences", "experiences"],
          ["Find a stay", "stay"],
          ["Talk to The Shorewood", "contact"],
        ];

      case "duration":
        return [
          ["3–4 days", "3-4"],
          ["5–7 days", "5-7"],
          ["8–10 days", "8-10"],
          ["10+ days", "10+"],
        ];

      case "shortDestination":
        return [
          ["Gulmarg", "gulmarg"],
          ["Pahalgam", "pahalgam"],
        ];

      case "interests":
        return [
          ["Nature & mountains", "nature"],
          ["Culture & heritage", "culture"],
          ["Luxury & comfort", "luxury"],
          ["Family-friendly", "family"],
        ];

      case "destination":
        return [
          ["Srinagar", "srinagar"],
          ["Mountains & valleys", "mountains"],
        ];

      case "experience":
        return [
          ["Dal Lake", "lake"],
          ["Kashmiri food", "food"],
          ["Culture & heritage", "heritage"],
        ];

      case "stay":
        return [
          ["Recommend a stay", "recommend"],
          ["Talk to the team", "contact"],
        ];

      case "contact":
        return [
          ["WhatsApp The Shorewood", "whatsapp"],
          ["Plan my trip", "book"],
        ];

      case "final":
        return [
          ["WhatsApp The Shorewood", "whatsapp"],
          ["Start over", "restart"],
        ];

      default:
        return [];
    }
  }

  const options = getOptions();

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat" : "Open The Shorewood chat"}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#033D4A] text-white shadow-xl transition-transform duration-200 hover:scale-105"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 11.5a7.5 7.5 0 01-8 7.5 8.7 8.7 0 01-3.2-.6L4 20l1.6-3.8A7.4 7.4 0 014 11.5 7.5 7.5 0 0112 4a7.5 7.5 0 018 7.5z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[60] flex w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-[#033D4A] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10">
                <span className="text-sm">S</span>

                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#033D4A] bg-green-400" />
              </div>

              <div>
                <p className="text-[14px] font-medium">
                  The Shorewood
                </p>

                <p className="text-[11px] text-white/60">
                  Kashmir travel concierge
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[380px] min-h-[260px] flex-col gap-3 overflow-y-auto bg-[#F7F7F5] p-4">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.from === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[84%] ${
                    message.from === "user"
                      ? "rounded-[18px] rounded-br-[5px] bg-[#033D4A] text-white"
                      : "rounded-[18px] rounded-bl-[5px] bg-white text-[#303030] shadow-sm"
                  } px-4 py-3`}
                >
                  <p className="text-[13px] leading-[1.55]">
                    {message.text}
                  </p>

                  {message.time && (
                    <p
                      className={`mt-1 text-[9px] ${
                        message.from === "user"
                          ? "text-white/45"
                          : "text-black/35"
                      }`}
                    >
                      {message.time}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-[18px] rounded-bl-[5px] bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-black/30" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Reply choices */}
          {options.length > 0 && !typing && (
            <div className="border-t border-black/5 bg-white p-4">
              <div className="flex flex-col gap-2">
                {options.map(([label, value]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleChoice(label, value)}
                    className="w-full rounded-full border border-[#033D4A]/20 px-4 py-2.5 text-left text-[12.5px] text-[#033D4A] transition-colors duration-200 hover:bg-[#033D4A] hover:text-white"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom */}
          <div className="border-t border-black/5 bg-white px-4 py-2.5 text-center">
            <p className="text-[9px] text-black/35">
              The Shorewood · Where Nature Finds Luxury
            </p>
          </div>
        </div>
      )}
    </>
  );
}