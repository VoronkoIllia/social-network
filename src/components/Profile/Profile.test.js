import { create } from "react-test-renderer";
import { Profile } from "./Profile";
import ProfileStatus from "./ProfileInfo/ProfileStatus";

describe("Profile page", () => {
  let status = "All Ok!";
  test("profile status should be correct", () => {
    let component = create(<Profile status={status} />);
    let instanse = component.root;
    expect(instanse.props.status).toBe(status);
  });
  test("span with correct status should be render", () => {
    let component = create(<ProfileStatus status={status} />);
    let instanse = component.root;
    let span = instanse.findByType("span");
    expect(span.props.children).toBe(status);
  });
});
