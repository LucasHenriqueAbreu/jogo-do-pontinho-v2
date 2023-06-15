import Board from "./Board";
import GetAroundPositions from "./GetAroundPositions";
import DistinyMark from "./DistinyMark";
import Point from "./Point";
import Position from "./Position";
import Score from "./Score";
import Mark from "./Mark";
import OriginMark from "./OriginMark";

export type HasNewScoreInput = {
  destinyPosition: Position,
  originPosition: Position,
  board: Board,
  ownerId: number
}

// TODO: change de name, maybe this just verify a new score of a new move.
class GetNewScores {
  static execute(params: HasNewScoreInput): Score[] {
    const { destinyPosition, originPosition, board, ownerId } = params;
    board.toString();
    const scores: Score[] = [];
    const originAroundPositions = GetAroundPositions.execute({ board: board, position: originPosition });
    const distinyAroundPositions = GetAroundPositions.execute({ board: board, position: destinyPosition });

    // Verify if is on horizontal
    // TODO: refatorar
    const isHorizontal = GetNewScores.isOnHorizontal(originPosition, destinyPosition);
    if (isHorizontal) {
      const hasTopDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.top, distinyAroundPositions.top);
      const hasBottonDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.bottom, distinyAroundPositions.bottom);
      if (hasTopDash) {
        const hasOriginSideDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.top, originPosition);
        const hasDistinySideDash = GetNewScores.hasAdash(board, ownerId, distinyAroundPositions.top, destinyPosition);
        if (hasOriginSideDash && hasDistinySideDash) {
          scores.push(
            new Score(
              [
                originPosition,
                destinyPosition,
                originAroundPositions.top!,
                distinyAroundPositions.top!
              ], ownerId,
            )
          );
        }

      }

      if (hasBottonDash) {
        const hasOriginSideDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.bottom, originPosition);
        const hasDistinySideDash = GetNewScores.hasAdash(board, ownerId, distinyAroundPositions.bottom, destinyPosition);
        if (hasOriginSideDash && hasDistinySideDash) {
          scores.push(
            new Score(
              [
                originPosition,
                destinyPosition,
                originAroundPositions.bottom!,
                distinyAroundPositions.bottom!
              ], ownerId,
            )
          );
        }
      }
    }
    if (!isHorizontal) {
      const hasRightDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.next, distinyAroundPositions.next);
      const hasLeftDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.previous, distinyAroundPositions.previous);
      if (hasRightDash) {
        const hasOriginSideDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.next, originPosition);
        const hasDistinySideDash = GetNewScores.hasAdash(board, ownerId, distinyAroundPositions.next, destinyPosition);
        if (hasOriginSideDash && hasDistinySideDash) {
          scores.push(
            new Score(
              [
                originPosition,
                destinyPosition,
                originAroundPositions.next!,
                distinyAroundPositions.next!
              ], ownerId,
            )
          );
        }

      }

      if (hasLeftDash) {
        const hasOriginSideDash = GetNewScores.hasAdash(board, ownerId, originAroundPositions.previous, originPosition);
        const hasDistinySideDash = GetNewScores.hasAdash(board, ownerId, distinyAroundPositions.previous, destinyPosition);
        if (hasOriginSideDash && hasDistinySideDash) {
          scores.push(
            new Score(
              [
                originPosition,
                destinyPosition,
                originAroundPositions.previous!,
                distinyAroundPositions.previous!
              ], ownerId,
            )
          );
        }
      }
    }
    return scores;
  }

  private static isOnHorizontal(originPosition: Position, destinyPosition: Position): boolean {
    return originPosition.rowIndex === destinyPosition.rowIndex;
  }

  private static hasAdash(board: Board, ownerId: number, positionOrigin?: Position, positionDistiny?: Position): boolean {
    if (!positionOrigin || !positionDistiny) {
      return false;
    }
    const pointFromOriginPosition = board.getPoint(positionOrigin);
    const pointFromDistinyPosition = board.getPoint(positionDistiny);
    const hasAdashInPointOneMarks = GetNewScores.hasAdashInPointByTargetPosition(pointFromOriginPosition, positionDistiny);
    const hasAdashInPointTwoMarks = GetNewScores.hasAdashInPointByTargetPosition(pointFromDistinyPosition, positionOrigin);

    return hasAdashInPointOneMarks || hasAdashInPointTwoMarks;
  }

  static hasAdashInPointByTargetPosition(point: Point, targetPosition: Position): boolean {
    return point.marks.list.some((mark: Mark) =>
      mark instanceof OriginMark && mark.isMyDistiny(targetPosition) ||
      mark instanceof DistinyMark && mark.isMyOrigin(targetPosition)
    );
  }

}

export default GetNewScores;