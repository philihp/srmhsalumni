import React from 'react'
import StaffCard from '../components/staff-card'

const About = () => (
  <div>
    <h2>Mission</h2>
    <p>
      The Southeast Raleigh Magnet High School Alumni Association is a
      non-profit organization. Its purpose is to foster, maintain and support a
      mutually beneficial relationship between alumni and SRMHS. The Board of
      Directors, comprised of Southeast Raleigh Magnet High School alumni,
      governs the Association by setting policy, providing guidance for the
      Association&#39;s programs and activities, and represents the interests of
      alumni to the School. Service on the Board of Directors is open to any
      interested alumnus.
    </p>
    <p>
      To champion a lifelong relationship between Southeast Raleigh Magnet High
      School and alumni.
    </p>

    <h2>Board</h2>
    <div className="flex flex-wrap">
      <StaffCard name="Tylisa Finley" title="President" src="/Tylisa.jpg" />
      <StaffCard
        title="Vice President"
        name="Tiffany Tate"
        src="/Tiffany.jpg"
      />
      <StaffCard title="Secretary" name="Des Woods" src="/Des.png" />
      <StaffCard
        title="Treasurer"
        name="Myshaina Kehinde"
        src="/Myshaina.jpg"
      />
      <StaffCard
        title="Membership Director"
        name="Clarissa Jones"
        src="/Clarissa.jpg"
      />
      <StaffCard
        title="Community Relations Director"
        name="Jess Moore Matthews"
        src="/Jess.jpg"
      />
      <StaffCard
        title="Director of Events and Programs"
        name="Jasmyne Ormond"
        src="/Jasmyne.jpg"
      />
    </div>
    <h2>Vision</h2>
    <p>
      The Southeast Raleigh Magnet High School Alumni Association is a
      remarkable non-profit organization that is recognized as a significant
      resource to the SRMHS Community. A dedicated committee and board of
      directors will lead a sustainable organization, abide by our mission
      statement, foster campus traditions, and provide a dynamic legacy for
      current and future Alumni of SRMHS
    </p>
    {/* <h2>Awards</h2>
    <p>Place holder page</p>
    <h2>Annual Report</h2>
    <p>Place holder page</p> */}
  </div>
)

export default About
