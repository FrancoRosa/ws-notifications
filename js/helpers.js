const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const getAllTanks = async (dips_id) => {
    const { data, error } = await supabase
        .from("latest")
        .select("location_id, updated_at")
    if (error) {
        console.log(error);
    }
    return data
};

const tanks_sample = [
    { location_id: 29, updated_at: '2025-02-07T21:13:07.977+00:00' },
    { location_id: 29, updated_at: '2025-02-07T21:13:07.977+00:00' },
    { location_id: 33, updated_at: '2025-02-07T21:10:00.792+00:00' },
    { location_id: 33, updated_at: '2025-02-07T21:10:00.792+00:00' },
    { location_id: 33, updated_at: '2025-02-07T21:10:00.792+00:00' },
    { location_id: 33, updated_at: '2025-02-07T21:10:00.792+00:00' },
    { location_id: 40, updated_at: '2025-02-07T21:10:02.775+00:00' },
    { location_id: 7, updated_at: '2024-09-20T19:28:32.856+00:00' },
    { location_id: 40, updated_at: '2025-02-07T21:10:02.775+00:00' },
    { location_id: 37, updated_at: '2025-02-07T21:10:00.947+00:00' },
    { location_id: 37, updated_at: '2025-02-07T21:10:00.947+00:00' },
    { location_id: 40, updated_at: '2025-02-07T21:10:02.775+00:00' },
    { location_id: 40, updated_at: '2025-02-07T21:10:02.775+00:00' },
    { location_id: 31, updated_at: '2025-02-07T21:10:01.474+00:00' },
    { location_id: 31, updated_at: '2025-02-07T21:10:01.474+00:00' },
    { location_id: 31, updated_at: '2025-02-07T21:10:01.474+00:00' },
    { location_id: 22, updated_at: '2025-02-07T21:10:01.592+00:00' },
    { location_id: 22, updated_at: '2025-02-07T21:10:01.592+00:00' },
    { location_id: 30, updated_at: '2025-02-07T21:10:01.235+00:00' },
    { location_id: 12, updated_at: '2025-02-07T21:10:01.805+00:00' },
    { location_id: 12, updated_at: '2025-02-07T21:10:01.805+00:00' },
    { location_id: 30, updated_at: '2025-02-07T21:10:01.235+00:00' },
    { location_id: 19, updated_at: '2025-02-07T21:10:01.973+00:00' },
    { location_id: 19, updated_at: '2025-02-07T21:10:01.973+00:00' },
    { location_id: 28, updated_at: '2025-02-07T21:10:01.806+00:00' },
    { location_id: 11, updated_at: '2025-02-07T21:10:02.419+00:00' },
    { location_id: 11, updated_at: '2025-02-07T21:10:02.419+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 13, updated_at: '2025-02-07T21:10:03.324+00:00' },
    { location_id: 13, updated_at: '2025-02-07T21:10:03.324+00:00' },
    { location_id: 13, updated_at: '2025-02-07T21:10:03.324+00:00' },
    { location_id: 13, updated_at: '2025-02-07T21:10:03.324+00:00' },
    { location_id: 7, updated_at: '2024-09-20T19:39:35.707+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 37, updated_at: '2025-02-07T21:10:00.947+00:00' },
    { location_id: 31, updated_at: '2025-02-07T21:10:01.474+00:00' },
    { location_id: 22, updated_at: '2025-02-07T21:10:01.592+00:00' },
    { location_id: 22, updated_at: '2025-02-07T21:10:01.592+00:00' },
    { location_id: 12, updated_at: '2025-02-07T21:10:01.805+00:00' },
    { location_id: 19, updated_at: '2025-02-07T21:10:01.973+00:00' },
    { location_id: 19, updated_at: '2025-02-07T21:10:01.973+00:00' },
    { location_id: 7, updated_at: '2024-09-20T19:28:32.856+00:00' },
    { location_id: 7, updated_at: '2024-09-20T19:28:32.856+00:00' },
    { location_id: 26, updated_at: '2025-02-07T21:10:02.352+00:00' },
    { location_id: 26, updated_at: '2025-02-07T21:10:02.352+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 36, updated_at: '2025-02-07T21:05:02.691+00:00' },
    { location_id: 5, updated_at: '2025-02-07T21:10:03.408+00:00' },
    { location_id: 5, updated_at: '2025-02-07T21:10:03.408+00:00' },
    { location_id: 18, updated_at: '2025-02-07T21:10:03.599+00:00' },
    { location_id: 15, updated_at: '2025-02-07T21:10:03.388+00:00' },
    { location_id: 15, updated_at: '2025-02-07T21:10:03.388+00:00' },
    { location_id: 2, updated_at: '2025-02-07T21:10:03.862+00:00' },
    { location_id: 16, updated_at: '2025-02-07T21:10:04.089+00:00' },
    { location_id: 2, updated_at: '2025-02-07T21:10:03.862+00:00' },
    { location_id: 6, updated_at: '2025-02-07T21:10:03.994+00:00' },
    { location_id: 6, updated_at: '2025-02-07T21:10:03.994+00:00' },
    { location_id: 6, updated_at: '2025-02-07T21:10:03.994+00:00' },
    { location_id: 6, updated_at: '2025-02-07T21:10:03.994+00:00' },
    { location_id: 36, updated_at: '2025-02-07T21:05:02.691+00:00' },
    { location_id: 16, updated_at: '2025-02-07T21:10:04.089+00:00' },
    { location_id: 6, updated_at: '2025-02-07T21:10:03.994+00:00' },
    { location_id: 22, updated_at: '2025-02-07T21:10:01.592+00:00' },
    { location_id: 20, updated_at: '2025-02-07T21:10:01.916+00:00' },
    { location_id: 20, updated_at: '2025-02-07T21:10:01.916+00:00' },
    { location_id: 17, updated_at: '2025-02-07T21:10:02.026+00:00' },
    { location_id: 17, updated_at: '2025-02-07T21:10:02.026+00:00' },
    { location_id: 21, updated_at: '2025-02-07T21:10:02.169+00:00' },
    { location_id: 17, updated_at: '2025-02-07T21:10:02.026+00:00' },
    { location_id: 23, updated_at: '2025-02-07T21:10:01.748+00:00' },
    { location_id: 26, updated_at: '2025-02-07T21:10:02.352+00:00' },
    { location_id: 14, updated_at: '2025-02-07T21:10:01.565+00:00' },
    { location_id: 39, updated_at: '2025-02-07T21:10:02.647+00:00' },
    { location_id: 25, updated_at: '2025-02-07T21:10:02.894+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 4, updated_at: '2025-02-07T21:10:03.296+00:00' },
    { location_id: 27, updated_at: '2025-02-07T21:10:02.881+00:00' },
    { location_id: 5, updated_at: '2025-02-07T21:10:03.408+00:00' },
    { location_id: 9, updated_at: '2025-02-07T21:10:03.268+00:00' },
    { location_id: 2, updated_at: '2025-02-07T21:10:03.862+00:00' },
    { location_id: 16, updated_at: '2025-02-07T21:10:04.089+00:00' },
    { location_id: 16, updated_at: '2025-02-07T21:10:04.089+00:00' },
    { location_id: 8, updated_at: '2025-02-07T21:10:05.866+00:00' },
    { location_id: 8, updated_at: '2025-02-07T21:10:05.866+00:00' },
    { location_id: 8, updated_at: '2025-02-07T21:10:05.866+00:00' },
    { location_id: 8, updated_at: '2025-02-07T21:10:05.866+00:00' },
    { location_id: 29, updated_at: '2025-02-07T21:13:07.977+00:00' },
    { location_id: 29, updated_at: '2025-02-07T21:13:07.977+00:00' },
    { location_id: 24, updated_at: '2025-02-07T21:10:07.627+00:00' },
    { location_id: 36, updated_at: '2025-02-07T21:05:02.691+00:00' },
    { location_id: 16, updated_at: '2025-02-07T21:10:04.089+00:00' },
    { location_id: 1, updated_at: '2025-02-07T21:10:11.562+00:00' },
    { location_id: 24, updated_at: '2025-02-07T21:10:07.627+00:00' },
]

const locations_sample = [
    { id: 16, name: 'Wadena', remote: 'karl-dips16' },
    { id: 9, name: 'Brandon', remote: 'karl-dip9' },
    { id: 10, name: 'Tisdale', remote: 'karl-dip10' },
    { id: 18, name: 'Traders PBCN2', remote: 'karl-dips18' },
    { id: 15, name: 'Regina', remote: 'karl-dips15' },
    {
        id: 2,
        name: 'Carlyle',
        remote: 'Win: 735145271,\nRPi: 148947797, pi@pi, raspberrypi, dips12'
    },
    { id: 7, name: 'Dips7', remote: 'karl-dips7' },
    { id: 4, name: 'Lloydminster', remote: 'karl-dip4' },
    { id: 19, name: 'Moosejaw', remote: 'karl-dip19' },
    { id: 12, name: 'Rosetown', remote: 'karl-dip12' },
    { id: 3, name: 'Thompson', remote: 'karl-dip3' },
    { id: 1, name: 'Prince Albert', remote: '667 215 546' },
    { id: 5, name: 'Carrot River', remote: 'karl-dip5' },
    { id: 8, name: 'Estevan', remote: 'karl-dip8' },
    { id: 6, name: 'Weyburn', remote: 'karl-dip6' },
    { id: 21, name: 'Ballantynes PBCN1', remote: 'karl-dips21' },
    { id: 20, name: 'Winkler Retail', remote: 'karl-dips20' },
    { id: 24, name: 'Kindersley', remote: 'karl-dips24' },
    { id: 25, name: 'Kenaston', remote: 'karl-dips25' },
    { id: 13, name: 'Killarney', remote: 'karl-dips13' },
    { id: 11, name: 'Melfort', remote: 'karl-dip11' },
    { id: 37, name: 'English River', remote: 'karl-dips37' },
    { id: 26, name: 'Waldheim', remote: 'karl-dips26' },
    { id: 27, name: 'La Ronge', remote: 'karl-dips27' },
    { id: 31, name: 'Miami ', remote: 'dips31-karl' },
    { id: 29, name: 'Morris', remote: 'dips29-karl' },
    { id: 23, name: 'Humboldt', remote: 'karl-dips23' },
    { id: 17, name: 'Winkler Bulk', remote: 'karl-dips17' },
    { id: 32, name: 'Morden', remote: 'dips32-karl' },
    { id: 30, name: 'Tall Boys', remote: 'dips30-karl' },
    { id: 33, name: 'Ctystal City', remote: 'dips33-karl' },
    { id: 22, name: 'Biggar', remote: 'karl-dips22' },
    { id: 36, name: 'Capital Circle Retail', remote: 'dips35--karl' },
    {
        id: 35,
        name: 'Capital Circle Petro-Pass',
        remote: 'dips35-karl'
    },
    {
        id: 39,
        name: 'Deacons Corner Petro-Pass',
        remote: 'karl-dips39  (.92, .91)'
    },
    { id: 40, name: 'Deacons Corner Retail', remote: 'karl-dips40' },
    { id: 14, name: 'MTT Service', remote: 'karl-dips14' },
    { id: 28, name: 'Kleysens Trucking', remote: 'karl-dips28' }
]

const getUniqueTanks = (tanks) => {
    return Object.values(
        tanks.reduce((acc, tank) => {
            const { location_id } = tank;
            if (!acc[location_id]) {
                acc[location_id] = tank;
            }
            return acc;
        }, {})
    );
};

const areDates1HourApart = (date1, date2) => {
    const differenceInMilliseconds = Math.abs(date1 - date2);
    const oneHourInMilliseconds = 60 * 60 * 1000;
    return differenceInMilliseconds >= oneHourInMilliseconds;
};

const getOutdatedIds = (unique) => {
    const now = new Date()
    const outdated = unique.filter(f => {
        const updated_time = new Date(f.updated_at)
        return areDates1HourApart(updated_time, now)
    })
    return outdated.map(o => o.location_id)

}

const getEnabledLocations = async () => {
    const { data, error } = await supabase
        .from("location")
        .select("id, name, remote").eq("enabled", true)
    if (error) {
        console.log(error);
    }
    return data
};

const getOutdatedLocations = (locations, ids) => {
    return locations.filter(l => ids.includes(l.id))
}

const getNotificationText = (outdated) => {
    const list = outdated.map(o => `${o.name} (${o.remote})`)
    return "The following `Dips` are *presenting issues*```\n" + list.join("\n") + "```"
}

const getOutDatedNotification = async () => {
    const locations = await getEnabledLocations()
    const tanks = await getAllTanks()
    const uniqueTanks = getUniqueTanks(tanks)
    const outdatedIds = getOutdatedIds(uniqueTanks)
    if (outdatedIds.length > 0) {
        return getNotificationText(getOutdatedLocations(locations, outdatedIds))
    }
    return false


}

const getQuote = async () => {
    const res = await fetch('https://qapi.vercel.app/api/random')
    const data = await res.json()
    return `${data.quote} - ${data.author}`
}

exports.getOutDatedNotification = getOutDatedNotification;
exports.getQuote = getQuote;