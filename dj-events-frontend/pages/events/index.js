import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE }  from '@/config/index';
import Pagination from '@/components/Pagination';

export default function EventsPage({events, page, total}) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }){

  // Start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE; 
  // Fetch Events Count
  const resTotal = await fetch(`${API_URL}/events/count`)
  const total = await resTotal.json();
  // Fetch Events
  const resEvents = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await resEvents.json();

  return{
    props: {
      events,
      page: +page,
      total
    }
  }
}
