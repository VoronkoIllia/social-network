import { follow, unfollow } from "./users-reducer"
import { ResponseCodes, ResponseWithErrors, usersAPI } from "../../api/api"

jest.mock("../../api/api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;



test("follow thunk work correct", async() => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    const result = ResponseCodes.Error
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    //@ts-ignore
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(2)
})

test("unfollow thunk work correct", async() => {
    const thunk = unfollow(1)
    const dispatchMock = jest.fn()

    const result = ResponseCodes.Error
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    //@ts-ignore
    await thunk(dispatchMock);
    expect(dispatchMock).toBeCalledTimes(2)
})