import usersReducer, { UsersInitialStateType, usersActions } from "./users-reducer"

let state: UsersInitialStateType;

beforeEach(() => {
  state  = {
      users: [
        {
          id: 0,
          name: "Vasya",
          followed: true,
          photos: { large: null, small: null },
          status: "vvv",
          uniqueUrlName: null
        },
        {
          id: 1,
          name: "Ivan",
          followed: false,
          photos: { large: null, small: null },
          status: "vvv",
          uniqueUrlName: null
        },
        {
          id: 2,
          name: "Petya",
          followed: true,
          photos: { large: null, small: null },
          status: "vvv",
          uniqueUrlName: null
      },
        {
          id: 3,
          name: "Petya",
          followed: false,
          photos: { large: null, small: null },
          status: "vvv",
          uniqueUrlName: null
        },
      ],
      currentPage: 1,
      followInProgress: [],
      isFetching: true,
      pageSize: 20,
    totalCount: 250,
    filter: {
      term: "",
      friend:undefined
      }
    }
})


describe("user-reducer", () => {
  test("follow action work correct", () => {
    const userId = 0
    const defaultUserId = 1

    const followAction = usersActions.followSuccess(userId);
    const newState = usersReducer(state, followAction);
    expect(newState.users[userId].followed).toBeTruthy();
    expect(newState.users[defaultUserId].followed).toBeFalsy();

  })
  test("unfollow action work correct", () => {
    
    const defaultUserId = 2
    const userId = 3
    const unfollowAction = usersActions.unfollowSuccess(userId);
    const newState = usersReducer(state, unfollowAction);

    expect(newState.users[userId].followed).toBeFalsy();
    expect(newState.users[defaultUserId].followed).toBeTruthy();
  })
})