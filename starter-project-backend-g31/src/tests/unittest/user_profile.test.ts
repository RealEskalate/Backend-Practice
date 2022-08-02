import { destructProfile } from "../../helper/userprofilehelper"


test("function destructProfile: given the body of request it should return the userProfile object", () => {
    const userProfile = {
        name: "jane.doe@example.com",
        bio: "Jane Doe",
        phone: "+25143674477",
        some: "this is nothing"
      }
    const userExpected = {
        name: "jane.doe@example.com",
        bio: "Jane Doe",
        phone: "+25143674477",
     
      }

    const profile = destructProfile(userProfile)

    expect(profile).toMatchObject(userExpected)

})