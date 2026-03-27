import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.10),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(196,181,253,0.10),_transparent_25%),linear-gradient(180deg,_#eef4fb_0%,_#e8f0f8_55%,_#eef4fb_100%)] px-6 py-12 text-slate-800 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.15),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#020617_100%)] dark:text-white">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to app
        </Link>

        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 dark:bg-white/10">
              <Mail className="h-6 w-6 text-slate-700 dark:text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-white/60">
                Support, account issues, and data deletion requests.
              </p>
            </div>
          </div>

          <div className="space-y-4 leading-7 text-slate-700 dark:text-white/80">
            <p>
              For support, account issues, or data deletion requests, contact us at:
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-medium text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
              support@carkeep.app
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}