export async function getTeamMembers() {
  const response = await fetch(
    "https://furnitureshopp.pythonanywhere.com/employees/"
  );

  if (!response.ok) {
    throw new Error("");
  }

  const data = await response.json();

  return data;
}
