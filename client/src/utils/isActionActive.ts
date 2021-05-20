type FunctionType = (actionsStatus: boolean[]) => boolean;

const isActionActive: FunctionType = (actionsStatus) => actionsStatus.includes(true);

export default isActionActive;
