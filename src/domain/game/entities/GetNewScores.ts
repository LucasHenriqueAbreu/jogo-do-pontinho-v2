import Board from "./Board";
import GetAroundPositions from "./GetAroundPositions";
import Position from "./Position";
import Score from "./Score";

export type HasNewScoreInput = {
  destinyPosition: Position,
  originPosition: Position,
  board: Board,
  ownerId: number
}

class GetNewScores {
  static execute(params: HasNewScoreInput): Score[] {
    const scores: Score[] = [];
    const originAroundPositions = GetAroundPositions.execute({ board: params.board, position: params.originPosition });
    const distinyAroundPositions = GetAroundPositions.execute({ board: params.board, position: params.destinyPosition });

    // Verify if is on horizontal, 
    const isHorizontal = GetNewScores.isOnHorizontal(params.originPosition, params.destinyPosition);
    if (isHorizontal) {
      const hasTopDash = GetNewScores.hasAdash(params.board, params.ownerId, originAroundPositions.top, distinyAroundPositions.top,);
      const hasBottonDash = GetNewScores.hasAdash(params.board, params.ownerId, originAroundPositions.bottom, distinyAroundPositions.bottom);
      if (hasTopDash) {
        scores.push(
          new Score(
            [
              params.originPosition,
              params.destinyPosition,
              originAroundPositions.top!,
              distinyAroundPositions.top!
            ], params.ownerId,
          )
        );

      }

      if (hasBottonDash) {
        scores.push(
          new Score(
            [
              params.originPosition,
              params.destinyPosition,
              originAroundPositions.bottom!,
              distinyAroundPositions.bottom!
            ], params.ownerId,
          )
        );

      }
    }
    if (!isHorizontal) {
      // Verify se combine both previous position has a move. Same to next
    }
    return scores;
  }

  private static isOnHorizontal(originPosition: Position, destinyPosition: Position): boolean {
    return originPosition.rowIndex === destinyPosition.rowIndex;
  }

  private static hasAdash(board: Board, ownerId: number, positionOne?: Position, positionTwo?: Position): boolean {
    if (!positionOne || !positionTwo) {
      return false;
    }
    const pointOne = board.getPoint(positionOne);
    const pointTwo = board.getPoint(positionTwo);
    const markOne = pointOne.marks.find('ownerId', ownerId);
    const markTwo = pointTwo.marks.find('ownerId', ownerId);
    return !!markOne && !!markTwo;
  }

}

export default GetNewScores;