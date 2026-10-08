import profileImage from '../assets/picture.jpg'

function Profile() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 opacity-25 blur-xl"
      />
      <div className="relative rounded-full bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 p-1.5 shadow-2xl shadow-indigo-200/70">
        <div className="rounded-full bg-slate-950 p-1">
          <img
            src={profileImage}
            alt="Bench Matthew Culubong"
            className="h-48 w-48 rounded-full object-cover sm:h-64 sm:w-64"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
