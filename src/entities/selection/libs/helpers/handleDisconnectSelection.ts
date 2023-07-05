import { SelectionSocket } from "../../api";
import { IConnectSelection } from "../../model";

export async function handleDisconnectSelection(
  selectionApi: SelectionSocket,
  viewer: IConnectSelection,
  owner: string | null,
  joinSession: string | null
) {
  const body = {
    fullName: viewer.body.fullName,
    id: viewer.body.id,
    joinSession: joinSession ? joinSession : null,
    owner: owner ? owner : null,
  };

  selectionApi.send({
    method: viewer.method,
    body,
  });

  selectionApi.disconectSelection();
}
