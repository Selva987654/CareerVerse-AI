import { CalendarClock, Users, MessageSquareText, ClipboardList, Star, FileText, Mic, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Panel, StatCard } from '../../components/dashboard/DashboardWidgets';
import { useAuth } from '../../context/AuthContext';
import { RealAccountProfile } from '../../components/dashboard/RealAccountProfile';
import { SavedItemsPanel } from '../../components/dashboard/SavedItemsPanel';

const sessions = [
  { title: 'Mock Interview \u2014 Batch A', date: 'Mon, 10:00 AM', seats: '12/15' },
  { title: 'Resume Review Clinic', date: 'Wed, 3:00 PM', seats: '8/20' },
  { title: 'Group Discussion Practice', date: 'Fri, 11:00 AM', seats: '18/18' },
];

const feedback = [
  { student: 'Aarav Kumar', note: 'Strong technical answers, work on confidence in HR round.' },
  { student: 'Divya Iyer', note: 'Good communication, needs more STAR-format examples.' },
];
const mentorProfiles=[
  {name:'Dr. Priya Raman',image:'https://i.pravatar.cc/120?img=47',expertise:'Software Careers & System Design',experience:'11 years',rating:4.9,languages:'English, Tamil',slots:'Tue 6 PM, Sat 10 AM',mode:'Online',duration:'45 min'},
  {name:'Arjun Menon',image:'https://i.pravatar.cc/120?img=12',expertise:'Data Analytics & Interview Prep',experience:'8 years',rating:4.8,languages:'English, Tamil, Malayalam',slots:'Wed 7 PM, Sun 11 AM',mode:'Online / Offline',duration:'60 min'},
  {name:'Nandhini S',image:'https://i.pravatar.cc/120?img=32',expertise:'HR, Resume & Communication',experience:'9 years',rating:4.7,languages:'English, Tamil, Hindi',slots:'Fri 5 PM, Sat 4 PM',mode:'Offline',duration:'45 min'},
];

export default function MentorDashboard() {
  const { user } = useAuth();
  const [slots,setSlots]=useState(['Tue, 6:00 PM · Online · 45 min','Sat, 10:00 AM · Offline · 60 min']);
  const [slot,setSlot]=useState('');
  const [requests,setRequests]=useState([{student:'Kavya R.',date:'Jul 14, 6:00 PM',mode:'Online',status:'Pending',notes:''},{student:'Arun K.',date:'Jul 16, 10:00 AM',mode:'Offline',status:'Accepted',notes:''}]);
  const [mentorQuery,setMentorQuery]=useState(''); const [booking,setBooking]=useState<{mentor:string;date:string;rating?:number;feedback?:string}|null>(null);
  const updateRequest=(student:string,status:string)=>setRequests(r=>r.map(x=>x.student===student?{...x,status}:x));

  return (
    <DashboardLayout title="Mentor Dashboard" subtitle={user?.meta?.specialty ?? 'Placement Trainer'}>
      {user && <div className="mb-6"><RealAccountProfile role="mentor" /></div>}
      <div className="mb-6"><SavedItemsPanel /></div>
      <Panel title="Find & Book a Mentor">
        <div className="relative mb-4"><Search size={16} className="absolute left-3 top-3 text-slate-400"/><input value={mentorQuery} onChange={e=>setMentorQuery(e.target.value)} placeholder="Search by name, expertise, language or mode" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm"/></div>
        <div className="grid gap-4 lg:grid-cols-3">{mentorProfiles.filter(m=>JSON.stringify(m).toLowerCase().includes(mentorQuery.toLowerCase())).map(m=><article key={m.name} className="rounded-2xl border border-slate-200 p-4"><div className="flex gap-3"><img src={m.image} alt={m.name} className="h-14 w-14 rounded-full object-cover"/><div><h3 className="font-bold text-slate-900">{m.name}</h3><p className="text-xs text-brand-600">{m.expertise}</p><p className="mt-1 text-xs"><Star size={12} className="inline text-amber-500" fill="currentColor"/> {m.rating} · {m.experience}</p></div></div><div className="mt-3 space-y-1 text-xs text-slate-600"><p>Languages: {m.languages}</p><p>Available: {m.slots}</p><p>{m.mode} · {m.duration}</p></div><input type="datetime-local" className="mt-3 w-full rounded-lg border border-slate-200 p-2 text-xs" onChange={e=>e.target.value&&setBooking({mentor:m.name,date:e.target.value})}/><button onClick={()=>{if(!booking||booking.mentor!==m.name)setBooking({mentor:m.name,date:'Next available slot'})}} className="mt-2 w-full rounded-full bg-brand-600 px-3 py-2 text-xs font-semibold text-white">View profile / Book session</button></article>)}</div>
        {booking&&<div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm"><b>Upcoming session:</b> {booking.mentor} · {booking.date}<div className="mt-2 flex flex-wrap items-center gap-2"><button onClick={()=>setBooking(null)} className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Cancel booking</button><select onChange={e=>setBooking(b=>b?{...b,rating:Number(e.target.value)}:b)} className="rounded-full border-0 px-3 py-1 text-xs"><option>Rate session</option>{[5,4,3,2,1].map(x=><option key={x} value={x}>{x} stars</option>)}</select><input placeholder="Submit feedback" onBlur={e=>setBooking(b=>b?{...b,feedback:e.target.value}:b)} className="rounded-full px-3 py-1 text-xs"/></div></div>}
      </Panel>
      <div className="mt-6" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Students Mentored" value="186" />
        <StatCard icon={CalendarClock} label="Sessions This Month" value="14" accent="indigo" />
        <StatCard icon={ClipboardList} label="Mock Interviews Done" value="52" accent="amber" />
        <StatCard icon={Star} label="Avg. Feedback Rating" value="4.7" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Upcoming Training Sessions">
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.title} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                    <p className="text-xs text-slate-500">{s.date}</p>
                  </div>
                  <span className="text-xs font-semibold text-brand-600">{s.seats} seats</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Mock Interview Slots">
            <div className="grid gap-3 sm:grid-cols-3">
              {['Technical', 'HR', 'Group Discussion'].map((t) => (
                <div key={t} className="rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-700">
                  {t}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Availability & Booking Requests">
            <div className="flex gap-2"><input value={slot} onChange={e=>setSlot(e.target.value)} placeholder="Date, time, mode and duration" className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"/><button onClick={()=>{if(slot.trim()){setSlots(s=>[...s,slot]);setSlot('')}}} className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Add slot</button></div>
            <div className="mt-3 flex flex-wrap gap-2">{slots.map(s=><span key={s} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">{s}</span>)}</div>
            <div className="mt-5 space-y-3">{requests.map(r=><div key={r.student} className="rounded-xl border border-slate-200 p-3"><div className="flex flex-wrap justify-between gap-2"><div><b className="text-sm">{r.student}</b><p className="text-xs text-slate-500">{r.date} · {r.mode}</p></div><span className="text-xs font-bold text-brand-600">{r.status}</span></div><div className="mt-2 flex flex-wrap gap-2"><button onClick={()=>updateRequest(r.student,'Accepted')} className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Accept</button><button onClick={()=>updateRequest(r.student,'Rejected')} className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Reject</button><button onClick={()=>updateRequest(r.student,'Completed')} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">Mark completed</button></div><textarea placeholder="Add private session notes" onChange={e=>setRequests(all=>all.map(x=>x.student===r.student?{...x,notes:e.target.value}:x))} className="mt-2 w-full rounded-lg border border-slate-200 p-2 text-xs"/></div>)}</div>
          </Panel>

          <Panel title="Student Feedback Reports" action={<MessageSquareText size={18} className="text-slate-400" />}>
            <div className="space-y-3">
              {feedback.map((f) => (
                <div key={f.student} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-800">{f.student}</p>
                  <p className="mt-1 text-xs text-slate-600">{f.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Mentor Quick Actions">
            <div className="space-y-2">
              {[
                { to: '/placement-training', label: 'Training Modules', icon: ClipboardList },
                { to: '/ai-tools/mock-interview', label: 'AI Mock Interview', icon: Mic },
                { to: '/ai-tools/resume-builder', label: 'AI Resume Builder', icon: FileText },
                { to: '/ai-tools/skill-gap', label: 'AI Skill Gap Analyzer', icon: Sparkles },
              ].map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Icon size={18} className="text-brand-600" /> {label}
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Training Modules You Run">
            <div className="space-y-2 text-sm text-slate-600">
              {['Aptitude', 'Technical Interview', 'HR Interview', 'Group Discussion', 'Resume Building'].map((m) => (
                <p key={m}>\u2022 {m}</p>
              ))}
            </div>
          </Panel>

          <Panel title="Student Progress Overview">
            <p className="text-sm text-slate-600">
              Track how mentored students are progressing through placement training modules on their dashboards.
            </p>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
