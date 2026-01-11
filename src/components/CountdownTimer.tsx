import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = () => {
    // Set the target date - 7 days from now
    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);

        const difference = +targetDate - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[70px] border border-primary-foreground/20">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground tabular-nums">
                    {value.toString().padStart(2, "0")}
                </div>
            </div>
            <div className="text-xs md:text-sm text-primary-foreground/80 mt-2 font-medium uppercase tracking-wider">
                {label}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 border-b border-primary-foreground/10">
            <div className="container-brand py-4 md:py-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    {/* Timer Label */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="bg-primary-foreground/10 rounded-full p-2 animate-pulse">
                            <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-primary-foreground font-bold text-base md:text-lg">
                                Limited Time Offer
                            </h3>
                            <p className="text-primary-foreground/80 text-xs md:text-sm">
                                Sale ends in:
                            </p>
                        </div>
                    </div>

                    {/* Countdown Display */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <div className="text-primary-foreground text-2xl md:text-3xl font-bold pb-6">:</div>
                        <TimeUnit value={timeLeft.hours} label="Hours" />
                        <div className="text-primary-foreground text-2xl md:text-3xl font-bold pb-6">:</div>
                        <TimeUnit value={timeLeft.minutes} label="Minutes" />
                        <div className="text-primary-foreground text-2xl md:text-3xl font-bold pb-6">:</div>
                        <TimeUnit value={timeLeft.seconds} label="Seconds" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
