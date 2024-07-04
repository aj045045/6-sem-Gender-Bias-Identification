import Image from "next/image";

function TempPage() {
  const image: string[] = ["error", "success", "confirmed", "feedback", "female_avatar", "forgot_password", "mail_sent", "notify", "pic_profile", "sign_up", "website"]
  return (
    <div className="grid grid-cols-3">
      {image.map((key, value) =>
        <Image height={0} key={key} alt="Image Tag" src={`/icons/${image[value]}.svg`} width={0} className="w-full max-w-xs p-5 mx-auto mt-10 bg-blue-300 h-60" />
      )}
    </div>
  )
}

export default TempPage;