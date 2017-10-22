// scripts.js
module.exports = () => {
    const data = { patients: [] }
    // Create 250000 patients with 2 medications
    for (let i = 0; i < 250000; i++) {
        data.patients.push({
            id: i,
            name: `name ${i}`,
            surname: `surname ${i}`,
            medication: [
                {
                    name: `mandatory medication ${i}`,
                },
                {
                    name: `optional medication ${i}`,
                }
            ]
        })
    }
    return data
}