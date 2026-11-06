import portfolioContent from '../data/portfolioContent'

function Profile() {
  return (
    <div className="profile-float relative">
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-full bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 opacity-25 blur-xl"
      />
      <div className="relative rounded-full bg-linear-to-br from-blue-400 via-indigo-400 to-purple-500 p-1.5 shadow-2xl shadow-indigo-200/70">
        <div className="relative overflow-hidden rounded-full bg-black p-1">
          <img
            src={portfolioContent.profilePhoto}
            alt={portfolioContent.name}
            className="h-40 w-40 rounded-full object-cover sm:h-64 sm:w-64"
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
