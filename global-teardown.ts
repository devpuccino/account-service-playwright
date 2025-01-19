import DatabaseKeyword from "./fixtures/DatabaseKeyword"

const teardown = () => {
    console.log("teardown up")
    DatabaseKeyword.disconnect()
}
export default teardown