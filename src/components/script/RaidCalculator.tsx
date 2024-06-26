import { useDispatch } from "react-redux";
import { RootState } from "../../Store.tsx";
import { useSelector } from "react-redux";
import { set_reset_raid_models } from "../../Store.tsx";
import { useEffect, useState } from "react";

import efficiencyWhiteThumbnail from "../../icons/efficiency_white_thumbnail.png";
import efficiencyBlackThumbnail from "../../icons/efficiency_black_thumbnail.png";

import raidRgbThumbnail from "../../icons/raid_rgb_thumbnail.png";
import raidBwThumbnail from "../../icons/raid_bw_thumbnail.png";

import explosivesRgbThumbnail from "../../icons/explosives_rgb_thumbnail.png";
import explosivesBwThumbnail from "../../icons/explosives_bw_thumbnail.png";

import ammoRgbThumbnail from "../../icons/ammo_rgb_thumbnail.png";
import ammoBwThumbnail from "../../icons/ammo_bw_thumbnail.png";

import satchelRgbThumbnail from "../../icons/satchel_rgb_thumbnail.png";
import satchelBwThumbnail from "../../icons/satchel_bw_thumbnail.png";

import sulfurThumbnail from "../../icons/sulfur_thumbnail.png";
import gunpowderThumbnail from "../../icons/gunpowder_thumbnail.png";
import charcoalThumbnail from "../../icons/charcoal_thumbnail.png";
import metalThumbnail from "../../icons/metal_thumbnail.png";
import metalPipeThumbnail from "../../icons/metal_pipe_thumbnail.png";
import lqFuelThumbnail from "../../icons/lq_fuel_thumbnail.png";
import clothThumbnail from "../../icons/cloth_thumbnail.png";
import techTrashThumbnail from "../../icons/tech_trash_thumbnail.png";
import hqMetalThumbnail from "../../icons/hq_metal_thumbnail.png";
import scrapThumbnail from "../../icons/scrap_thumbnail.png";
import animalFatThumbnail from "../../icons/animal_fat_thumbnail.png";
import ropeThumbnail from "../../icons/rope_thumbnail.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { AudioPlayer } from "./AudioPlayer.tsx";
import menu_sound from "../../audio/menu_sound.mp3";
import buttons_sound from "../../audio/buttons_sound.mp3";
import rocket_sound from "../../audio/rocket_sound.mp3";
import charge_sound from "../../audio/charge_sound.mp3";
import ammo_sound from "../../audio/ammo_sound2.mp3";
import satchel_sound from "../../audio/satchel_sound.mp3";

//? ----------------------------------------------------------------------------------------------------

//? This component calculates the raid cost, which is divided into five different types: efficiency, rockets, C4, explosive ammo, and satchels.

//? Each raid type is further broken down into its required ingredients for crafting.

//? Additionally, it includes a button to reset the calculator and the list of destroyed objects.

//? ----------------------------------------------------------------------------------------------------

export default function RaidCalculator() {
  const dispatch = useDispatch();

  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);
  const reset_raid_models = useSelector((state: RootState) => state.modelsData.reset_raid_models); //prettier-ignore
  const model_destroy_tigger = useSelector((state: RootState) => state.modelsData.model_destroy_trigger); //prettier-ignore
  const model_to_destroy = useSelector((state: RootState) => state.modelsData.model_to_destroy); //prettier-ignore
  const audio = useSelector((state: RootState) => state.pageSettings.audio); //prettier-ignore

  const [raid_type, set_raid_type] = useState<string>("efficiency");
  const [rockets_cost, set_rockets_cost] = useState<number>(0);
  const [explosives_cost, set_explosives_cost] = useState<number>(0);
  const [ammo_cost, set_ammo_cost] = useState<number>(0);
  const [satchel_cost, set_satchel_cost] = useState<number>(0);

  const [count_sub_ingredients, set_count_sub_ingredients] = useState(false);

  const [sulfur_cost, set_sulfur_cost] = useState<number>(0);
  const [gunpowder_cost, set_gunpowder_cost] = useState<number>(0);
  const [charcoal_cost, set_charcoal_cost] = useState<number>(0);
  const [metal_fragments_cost, set_metal_fragments_cost] = useState<number>(0);
  const [metal_pipe_cost, set_metal_pipe_cost] = useState<number>(0);
  const [lq_fuel_cost, set_lq_fuel_cost] = useState<number>(0);
  const [cloth_cost, set_cloth_cost] = useState<number>(0);
  const [tech_trash_cost, set_tech_trash_cost] = useState<number>(0);
  const [hq_metal_cost, set_hq_metal_cost] = useState<number>(0);
  const [scrap_cost, set_scrap_cost] = useState<number>(0);
  const [animal_fat_cost, set_animal_fat_cost] = useState<number>(0);
  const [rope_cost, set_rope_cost] = useState<number>(0);

  //* ------------------------- ↓ Reset the Raid ↓ -------------------------
  // reset all the build cost
  // dispatch the reset_raid_models to the Redux store, so each model component can trigger a function to
  // show the previously hidden models due to the "raiding destruction"

  function ResetRaid() {
    dispatch(set_reset_raid_models(!reset_raid_models));
    set_rockets_cost(0);
    set_explosives_cost(0);
    set_ammo_cost(0);
    set_satchel_cost(0);

    set_sulfur_cost(0);
    set_gunpowder_cost(0);
    set_charcoal_cost(0);
    set_metal_fragments_cost(0);
    if (audio) {
      AudioPlayer(menu_sound);
    }
  }

  //* ------------------------- ↑ Reset the Raid ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Efficiency ↓ -------------------------
  // calculate the "efficiency" type of the raid mode
  // this function counts the most efficient way to raid a selected object

  function CalculateEfficiencyCost() {
    if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle" ||
      model_to_destroy === "StoneRoofSquare" ||
      model_to_destroy === "StoneRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 2);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle" ||
      model_to_destroy === "MetalRoofSquare" ||
      model_to_destroy === "MetalRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 4);
    } else if (
      model_to_destroy === "ArmoredFoundationSquareHigh" ||
      model_to_destroy === "ArmoredFoundationSquareMid" ||
      model_to_destroy === "ArmoredFoundationSquareLow" ||
      model_to_destroy === "ArmoredFoundationTriangleHigh" ||
      model_to_destroy === "ArmoredFoundationTriangleMid" ||
      model_to_destroy === "ArmoredFoundationTriangleLow" ||
      model_to_destroy === "ArmoredWallHigh" ||
      model_to_destroy === "ArmoredWallMid" ||
      model_to_destroy === "ArmoredWallLow" ||
      model_to_destroy === "ArmoredDoorway" ||
      model_to_destroy === "ArmoredWindow" ||
      model_to_destroy === "ArmoredWallFrame" ||
      model_to_destroy === "ArmoredFloorFrameSquare" ||
      model_to_destroy === "ArmoredFloorFrameTriangle" ||
      model_to_destroy === "ArmoredFloorSquare" ||
      model_to_destroy === "ArmoredFloorTriangle" ||
      model_to_destroy === "ArmoredStairsLShape" ||
      model_to_destroy === "ArmoredStairsUShape" ||
      model_to_destroy === "ArmoredRoofSquare" ||
      model_to_destroy === "ArmoredRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 8);
    } else if (model_to_destroy === "MetalDoor") {
      set_ammo_cost(ammo_cost + 63);
    } else if (model_to_destroy === "StrenghtenedGlassWindow") {
      set_ammo_cost(ammo_cost + 140);
    } else if (model_to_destroy === "GarageDoor") {
      set_ammo_cost(ammo_cost + 150);
    } else if (
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "MetalVerticalEmbrasure"
    ) {
      set_ammo_cost(ammo_cost + 173);
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Efficiency ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Rockets ↓ -------------------------
  // calculate the "rockets" type of the raid mode
  // this function counts only the rocket costs on selected objects

  function CalculateRocketCost() {
    if (model_to_destroy === "MetalDoor") {
      set_rockets_cost(rockets_cost + 2);
    } else if (model_to_destroy === "GarageDoor" || model_to_destroy === "StrenghtenedGlassWindow") {
      set_rockets_cost(rockets_cost + 3);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle" ||
      model_to_destroy === "MetalVerticalEmbrasure" ||
      model_to_destroy === "StoneRoofSquare" ||
      model_to_destroy === "StoneRoofTriangle"
    ) {
      set_rockets_cost(rockets_cost + 4);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle" ||
      model_to_destroy === "MetalRoofSquare" ||
      model_to_destroy === "MetalRoofTriangle"
    ) {
      set_rockets_cost(rockets_cost + 8);
    } else if (
      model_to_destroy === "ArmoredFoundationSquareHigh" ||
      model_to_destroy === "ArmoredFoundationSquareMid" ||
      model_to_destroy === "ArmoredFoundationSquareLow" ||
      model_to_destroy === "ArmoredFoundationTriangleHigh" ||
      model_to_destroy === "ArmoredFoundationTriangleMid" ||
      model_to_destroy === "ArmoredFoundationTriangleLow" ||
      model_to_destroy === "ArmoredWallHigh" ||
      model_to_destroy === "ArmoredWallMid" ||
      model_to_destroy === "ArmoredWallLow" ||
      model_to_destroy === "ArmoredDoorway" ||
      model_to_destroy === "ArmoredWindow" ||
      model_to_destroy === "ArmoredWallFrame" ||
      model_to_destroy === "ArmoredFloorFrameSquare" ||
      model_to_destroy === "ArmoredFloorFrameTriangle" ||
      model_to_destroy === "ArmoredFloorSquare" ||
      model_to_destroy === "ArmoredFloorTriangle" ||
      model_to_destroy === "ArmoredStairsLShape" ||
      model_to_destroy === "ArmoredStairsUShape" ||
      model_to_destroy === "ArmoredRoofSquare" ||
      model_to_destroy === "ArmoredRoofTriangle"
    ) {
      set_rockets_cost(rockets_cost + 15);
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Rockets ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Explosives ↓ -------------------------
  // calculate the "explosives" type of the raid mode
  // this function counts only the esplosives costs on selected objects

  function CalculateExplosivesCost() {
    if (model_to_destroy === "MetalDoor") {
      set_explosives_cost(explosives_cost + 1);
    } else if (model_to_destroy === "GarageDoor" || model_to_destroy === "StrenghtenedGlassWindow") {
      set_explosives_cost(explosives_cost + 2);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle" ||
      model_to_destroy === "MetalVerticalEmbrasure" ||
      model_to_destroy === "StoneRoofSquare" ||
      model_to_destroy === "StoneRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 2);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle" ||
      model_to_destroy === "MetalRoofSquare" ||
      model_to_destroy === "MetalRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 4);
    } else if (
      model_to_destroy === "ArmoredFoundationSquareHigh" ||
      model_to_destroy === "ArmoredFoundationSquareMid" ||
      model_to_destroy === "ArmoredFoundationSquareLow" ||
      model_to_destroy === "ArmoredFoundationTriangleHigh" ||
      model_to_destroy === "ArmoredFoundationTriangleMid" ||
      model_to_destroy === "ArmoredFoundationTriangleLow" ||
      model_to_destroy === "ArmoredWallHigh" ||
      model_to_destroy === "ArmoredWallMid" ||
      model_to_destroy === "ArmoredWallLow" ||
      model_to_destroy === "ArmoredDoorway" ||
      model_to_destroy === "ArmoredWindow" ||
      model_to_destroy === "ArmoredWallFrame" ||
      model_to_destroy === "ArmoredFloorFrameSquare" ||
      model_to_destroy === "ArmoredFloorFrameTriangle" ||
      model_to_destroy === "ArmoredFloorSquare" ||
      model_to_destroy === "ArmoredFloorTriangle" ||
      model_to_destroy === "ArmoredStairsLShape" ||
      model_to_destroy === "ArmoredStairsUShape" ||
      model_to_destroy === "ArmoredRoofSquare" ||
      model_to_destroy === "ArmoredRoofTriangle"
    ) {
      set_explosives_cost(explosives_cost + 8);
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Explosives ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Exp. Ammo ↓ -------------------------
  // calculate the "explosive ammo" type of the raid mode
  // this function counts only the explosive ammo costs on selected objects

  function CalculateAmmoCost() {
    if (model_to_destroy === "MetalDoor") {
      set_ammo_cost(ammo_cost + 63);
    } else if (model_to_destroy === "StrenghtenedGlassWindow") {
      set_ammo_cost(ammo_cost + 140);
    } else if (model_to_destroy === "GarageDoor") {
      set_ammo_cost(ammo_cost + 150);
    } else if (
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "MetalVerticalEmbrasure"
    ) {
      set_ammo_cost(ammo_cost + 173);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle" ||
      model_to_destroy === "StoneRoofSquare" ||
      model_to_destroy === "StoneRoofTriangle"
    ) {
      set_ammo_cost(ammo_cost + 185);
    } else if (model_to_destroy === "MetalStairsLShape" || model_to_destroy === "MetalStairsUShape") {
      set_ammo_cost(ammo_cost + 399);
    } else if (
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle" ||
      model_to_destroy === "MetalRoofSquare" ||
      model_to_destroy === "MetalRoofTriangle"
    ) {
      set_ammo_cost(ammo_cost + 400);
    } else if (model_to_destroy === "MetalFloorTriangle") {
      set_ammo_cost(ammo_cost + 413);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow"
    ) {
      set_ammo_cost(ammo_cost + 461);
    } else if (
      model_to_destroy === "ArmoredFoundationSquareHigh" ||
      model_to_destroy === "ArmoredFoundationSquareMid" ||
      model_to_destroy === "ArmoredFoundationSquareLow" ||
      model_to_destroy === "ArmoredFoundationTriangleHigh" ||
      model_to_destroy === "ArmoredFoundationTriangleMid" ||
      model_to_destroy === "ArmoredFoundationTriangleLow" ||
      model_to_destroy === "ArmoredWallHigh" ||
      model_to_destroy === "ArmoredWallMid" ||
      model_to_destroy === "ArmoredWallLow" ||
      model_to_destroy === "ArmoredDoorway" ||
      model_to_destroy === "ArmoredWindow" ||
      model_to_destroy === "ArmoredWallFrame" ||
      model_to_destroy === "ArmoredFloorFrameSquare" ||
      model_to_destroy === "ArmoredFloorFrameTriangle" ||
      model_to_destroy === "ArmoredFloorSquare" ||
      model_to_destroy === "ArmoredFloorTriangle" ||
      model_to_destroy === "ArmoredStairsLShape" ||
      model_to_destroy === "ArmoredStairsUShape" ||
      model_to_destroy === "ArmoredRoofSquare" ||
      model_to_destroy === "ArmoredRoofTriangle"
    ) {
      set_ammo_cost(ammo_cost + 799);
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Exp. Ammo ↑ -------------------------

  //* ------------------------- ↓ Raid Cost Calculator: Satchel Charge ↓ -------------------------
  // calculate the "satchel charge" type of the raid mode
  // this function counts only the satchel charge costs on selected objects

  function CalculateSatchelsCost() {
    if (model_to_destroy === "MetalDoor") {
      set_satchel_cost(satchel_cost + 4);
    } else if (model_to_destroy === "GarageDoor" || model_to_destroy === "StrenghtenedGlassWindow") {
      set_satchel_cost(satchel_cost + 9);
    } else if (
      model_to_destroy === "StoneFoundationSquareHigh" ||
      model_to_destroy === "StoneFoundationSquareMid" ||
      model_to_destroy === "StoneFoundationSquareLow" ||
      model_to_destroy === "StoneFoundationTriangleHigh" ||
      model_to_destroy === "StoneFoundationTriangleMid" ||
      model_to_destroy === "StoneFoundationTriangleLow" ||
      model_to_destroy === "StoneWallHigh" ||
      model_to_destroy === "StoneWallMid" ||
      model_to_destroy === "StoneWallLow" ||
      model_to_destroy === "StoneDoorway" ||
      model_to_destroy === "StoneWindow" ||
      model_to_destroy === "StoneStairsLShape" ||
      model_to_destroy === "StoneStairsUShape" ||
      model_to_destroy === "StoneWallFrame" ||
      model_to_destroy === "StoneFloorSquare" ||
      model_to_destroy === "StoneFloorTriangle" ||
      model_to_destroy === "StoneFloorFrameSquare" ||
      model_to_destroy === "StoneFloorFrameTriangle" ||
      model_to_destroy === "StoneRoofSquare" ||
      model_to_destroy === "StoneRoofTriangle"
    ) {
      set_satchel_cost(satchel_cost + 10);
    } else if (model_to_destroy === "MetalVerticalEmbrasure") {
      set_satchel_cost(satchel_cost + 13);
    } else if (
      model_to_destroy === "MetalFoundationSquareHigh" ||
      model_to_destroy === "MetalFoundationSquareMid" ||
      model_to_destroy === "MetalFoundationSquareLow" ||
      model_to_destroy === "MetalFoundationTriangleHigh" ||
      model_to_destroy === "MetalFoundationTriangleMid" ||
      model_to_destroy === "MetalFoundationTriangleLow" ||
      model_to_destroy === "MetalWallHigh" ||
      model_to_destroy === "MetalWallMid" ||
      model_to_destroy === "MetalWallLow" ||
      model_to_destroy === "MetalDoorway" ||
      model_to_destroy === "MetalWindow" ||
      model_to_destroy === "MetalStairsLShape" ||
      model_to_destroy === "MetalStairsUShape" ||
      model_to_destroy === "MetalWallFrame" ||
      model_to_destroy === "MetalFloorSquare" ||
      model_to_destroy === "MetalFloorTriangle" ||
      model_to_destroy === "MetalFloorFrameSquare" ||
      model_to_destroy === "MetalFloorFrameTriangle" ||
      model_to_destroy === "MetalRoofSquare" ||
      model_to_destroy === "MetalRoofTriangle"
    ) {
      set_satchel_cost(satchel_cost + 23);
    } else if (
      model_to_destroy === "ArmoredFoundationSquareHigh" ||
      model_to_destroy === "ArmoredFoundationSquareMid" ||
      model_to_destroy === "ArmoredFoundationSquareLow" ||
      model_to_destroy === "ArmoredFoundationTriangleHigh" ||
      model_to_destroy === "ArmoredFoundationTriangleMid" ||
      model_to_destroy === "ArmoredFoundationTriangleLow" ||
      model_to_destroy === "ArmoredWallHigh" ||
      model_to_destroy === "ArmoredWallMid" ||
      model_to_destroy === "ArmoredWallLow" ||
      model_to_destroy === "ArmoredDoorway" ||
      model_to_destroy === "ArmoredWindow" ||
      model_to_destroy === "ArmoredWallFrame" ||
      model_to_destroy === "ArmoredFloorFrameSquare" ||
      model_to_destroy === "ArmoredFloorFrameTriangle" ||
      model_to_destroy === "ArmoredFloorSquare" ||
      model_to_destroy === "ArmoredFloorTriangle" ||
      model_to_destroy === "ArmoredStairsLShape" ||
      model_to_destroy === "ArmoredStairsUShape" ||
      model_to_destroy === "ArmoredRoofSquare" ||
      model_to_destroy === "ArmoredRoofTriangle"
    ) {
      set_satchel_cost(satchel_cost + 46);
    }
  }

  //* ------------------------- ↑ Raid Cost Calculator: Satchel Charge ↑ -------------------------

  // -------------------------  calculate the sulfur cost for every destroyed object -------------------------

  function CalculateSulfurCost() {
    if (!count_sub_ingredients) {
      const sulfur_cost_rocket = rockets_cost * 1400;
      const sulfur_cost_explosives = explosives_cost * 2200;
      const sulfur_cost_ammo = ammo_cost * 25;
      const sulfur_cost_satchel = satchel_cost * 480;
      set_sulfur_cost(sulfur_cost_rocket + sulfur_cost_explosives + sulfur_cost_ammo + sulfur_cost_satchel);
    } else if (count_sub_ingredients) {
      const sulfur_cost_rocket = rockets_cost * 100;
      const sulfur_cost_explosives = explosives_cost * 100;
      const sulfur_cost_ammo = ammo_cost * 5;
      const sulfur_cost_satchel = satchel_cost * 0;
      set_sulfur_cost(sulfur_cost_rocket + sulfur_cost_explosives + sulfur_cost_ammo + sulfur_cost_satchel);
    }
  }

  // -------------------------  calculate the gunpowder cost for every destroyed object -------------------------

  function CalculateGunpowderCost() {
    if (!count_sub_ingredients) {
      const gunpowder_cost_explosives = explosives_cost * 0;
      const gunpowder_cost_ammo = ammo_cost * 0;

      set_gunpowder_cost(gunpowder_cost_explosives + gunpowder_cost_ammo);
    } else if (count_sub_ingredients) {
      const gunpowder_cost_rocket = rockets_cost * 650;
      const gunpowder_cost_explosives = explosives_cost * 1000;
      const gunpowder_cost_ammo = ammo_cost * 10;
      const gunpowder_cost_satchel = satchel_cost * 240;
      set_gunpowder_cost(
        gunpowder_cost_rocket + gunpowder_cost_explosives + gunpowder_cost_ammo + gunpowder_cost_satchel
      );
    }
  }

  // -------------------------  calculate the charcoal cost for every destroyed object -------------------------

  function CalculateCharcoalCost() {
    if (!count_sub_ingredients) {
      const charcoal_cost_rocket = rockets_cost * 1950;
      const charcoal_cost_explosives = explosives_cost * 3000;
      const charcoal_cost_ammo = ammo_cost * 30;
      const charcoal_cost_satchel = satchel_cost * 720;
      set_charcoal_cost(charcoal_cost_rocket + charcoal_cost_explosives + charcoal_cost_ammo + charcoal_cost_satchel);
    } else if (count_sub_ingredients) {
      const charcoal_cost_rocket = rockets_cost * 1950;
      const charcoal_cost_explosives = explosives_cost * 3000;
      const charcoal_cost_ammo = ammo_cost * 30;
      const charcoal_cost_satchel = satchel_cost * 720;
      set_charcoal_cost(charcoal_cost_rocket + charcoal_cost_explosives + charcoal_cost_ammo + charcoal_cost_satchel);
    }
  }

  // -------------------------  calculate the metal frag. cost for every destroyed object -------------------------

  function CalculateMetalFragmentsCost() {
    const metal_fragments_cost_rocket = rockets_cost * 100;
    const metal_fragments_cost_explosives = explosives_cost * 200;
    const metal_fragments_cost_ammo = ammo_cost * 5;
    const metal_fragments_cost_satchel = satchel_cost * 80;
    set_metal_fragments_cost(
      metal_fragments_cost_rocket +
        metal_fragments_cost_explosives +
        metal_fragments_cost_ammo +
        metal_fragments_cost_satchel
    );
  }

  // -------------------------  calculate the metal pipes cost for every destroyed object -------------------------

  function CalculateMetalPipesCost() {
    if (!count_sub_ingredients) {
      const metal_pipes_cost_rocket = rockets_cost * 2;
      set_metal_pipe_cost(metal_pipes_cost_rocket);
    } else if (count_sub_ingredients) {
      const metal_pipes_cost_rocket = rockets_cost * 0;
      set_metal_pipe_cost(metal_pipes_cost_rocket);
    }
  }

  // -------------------------  calculate the lq. fuel cost for every destroyed object -------------------------

  function CalculateLqFuelCost() {
    if (!count_sub_ingredients) {
      const lq_fuel_cost_rocket = rockets_cost * 30;
      const lq_fuel_cost_explosives = explosives_cost * 60;
      set_lq_fuel_cost(lq_fuel_cost_rocket + lq_fuel_cost_explosives);
    } else if (count_sub_ingredients) {
      const lq_fuel_cost_rocket = rockets_cost * 0;
      const lq_fuel_cost_explosives = explosives_cost * 0;
      set_lq_fuel_cost(lq_fuel_cost_rocket + lq_fuel_cost_explosives);
    }
  }

  // -------------------------  calculate the cloth cost for every destroyed object -------------------------

  function CalculateClothCost() {
    if (!count_sub_ingredients) {
      const cloth_cost_explosives = explosives_cost * 5;
      const cloth_cost_satchel = satchel_cost * 10;
      set_cloth_cost(cloth_cost_explosives + cloth_cost_satchel);
    } else if (count_sub_ingredients) {
      const cloth_cost_rocket = rockets_cost * 8;
      const cloth_cost_explosives = explosives_cost * 20;
      const cloth_cost_satchel = satchel_cost * 10;
      set_cloth_cost(cloth_cost_rocket + cloth_cost_explosives + cloth_cost_satchel);
    }
  }

  // -------------------------  calculate the tech trash cost for every destroyed object -------------------------

  function CalculateTechTrashCost() {
    const tech_trash_cost_explosives = explosives_cost * 2;
    set_tech_trash_cost(tech_trash_cost_explosives);
  }

  // -------------------------  calculate the hq. metal cost for every destroyed object -------------------------

  function CalculateHqMetalCost() {
    if (count_sub_ingredients) {
      const hq_metal_cost_explosives = rockets_cost * 4;
      set_hq_metal_cost(hq_metal_cost_explosives);
    }
  }

  // -------------------------  calculate the scrap cost for every destroyed object -------------------------

  function CalculateScrapCost() {
    if (count_sub_ingredients) {
      const scrap_cost_rocket = rockets_cost * 40;
      set_scrap_cost(scrap_cost_rocket);
    }
  }

  // -------------------------  calculate the animal fat cost for every destroyed object -------------------------

  function CalculateAnimalFatCost() {
    if (count_sub_ingredients) {
      const animal_fat_cost_rocket = rockets_cost * 24;
      const animal_fat_cost_explosives = explosives_cost * 45;
      set_animal_fat_cost(animal_fat_cost_rocket + animal_fat_cost_explosives);
    } else if (!count_sub_ingredients) {
      const animal_fat_cost_explosives = explosives_cost * 0;
      set_animal_fat_cost(animal_fat_cost_explosives);
    }
  }

  // -------------------------  calculate the rope cost for every destroyed object -------------------------

  function CalculateRRopeCost() {
    const rope_cost_satchel = satchel_cost * 1;
    set_rope_cost(rope_cost_satchel);
  }

  function ChangeRaidType(type: string) {
    if (type !== raid_type) {
      set_raid_type(type);

      if (audio) {
        if (type === "efficiency") {
          AudioPlayer(menu_sound);
        }

        if (type === "rockets") {
          AudioPlayer(rocket_sound);
        }
        if (type === "explosives") {
          AudioPlayer(charge_sound);
        }
        if (type === "ammo") {
          AudioPlayer(ammo_sound);
        }
        if (type === "satchel") {
          AudioPlayer(satchel_sound);
        }
      }
    }
  }

  //* ------------------------- ↓ Calculator Trigger ↓ -------------------------
  // trigger the raid cost calculator when any model changes the value of the model_destroy_trigger in the Redux Store

  useEffect(() => {
    {
      if (raid_type === "rockets") {
        CalculateRocketCost();
      } else if (raid_type === "explosives") {
        CalculateExplosivesCost();
      } else if (raid_type === "ammo") {
        CalculateAmmoCost();
      } else if (raid_type === "satchel") {
        CalculateSatchelsCost();
      } else if (raid_type === "efficiency") {
        CalculateEfficiencyCost();
      }
    }
  }, [model_destroy_tigger]);

  //* ------------------------- ↑ Calculator Trigger ↑ -------------------------

  const HandleAdvancedResourceCountingState = () => {
    set_count_sub_ingredients(!count_sub_ingredients);
    if (audio) {
      AudioPlayer(buttons_sound);
    }
  };

  const NumbersFormatter = (number: any) => {
    if (number > 9999) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else return number;
  };

  //* ------------------------- ↓ Ingredients Cost ↓ -------------------------
  // calculate all of the ingredients cost if any of the raid type tool amount changes

  useEffect(() => {
    {
      CalculateSulfurCost();
      CalculateGunpowderCost();
      CalculateCharcoalCost();
      CalculateMetalFragmentsCost();
      CalculateMetalPipesCost();
      CalculateLqFuelCost();
      CalculateClothCost();
      CalculateTechTrashCost();
      CalculateHqMetalCost();
      CalculateScrapCost();
      CalculateAnimalFatCost();
      CalculateRRopeCost();
    }
  }, [rockets_cost, explosives_cost, ammo_cost, satchel_cost, count_sub_ingredients]);

  //* ------------------------- ↑ Ingredients Cost ↑ -------------------------

  // -------------------------  reset the raid cost on page mode change -------------------------

  useEffect(() => {
    {
      set_rockets_cost(0);
      set_explosives_cost(0);
      set_ammo_cost(0);
      set_satchel_cost(0);

      set_sulfur_cost(0);
      set_gunpowder_cost(0);
      set_charcoal_cost(0);
      set_metal_fragments_cost(0);
    }
  }, [page_mode]);

  return (
    <>
      <div className="misc_cost_checkbox checkbox_raid">raid cost (resources)</div>
      <div className="raid_type_name">raid with:</div>

      <div className="raid_type_description">
        <div className="raid_type_description_cell">most efficient</div>
        <div className="raid_type_description_cell">rockets</div>
        <div className="raid_type_description_cell">C4's</div>
        <div className="raid_type_description_cell">EXP. 5.56</div>
        <div className="raid_type_description_cell">satchels</div>
      </div>

      <div className="raid_type_main_container">
        <div
          className={
            raid_type === "efficiency"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("efficiency")}
          style={
            raid_type === "efficiency"
              ? { backgroundImage: `url(${efficiencyBlackThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${efficiencyWhiteThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "rockets"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("rockets")}
          style={
            raid_type === "rockets"
              ? { backgroundImage: `url(${raidRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${raidBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "explosives"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("explosives")}
          style={
            raid_type === "explosives"
              ? { backgroundImage: `url(${explosivesRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${explosivesBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "ammo"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("ammo")}
          style={
            raid_type === "ammo"
              ? { backgroundImage: `url(${ammoRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${ammoBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
        <div
          className={
            raid_type === "satchel"
              ? "raid_type_button raid_type_button_active"
              : "raid_type_button raid_type_button_inactive"
          }
          onClick={() => ChangeRaidType("satchel")}
          style={
            raid_type === "satchel"
              ? { backgroundImage: `url(${satchelRgbThumbnail})`, backgroundSize: "cover" }
              : { backgroundImage: `url(${satchelBwThumbnail})`, backgroundSize: "cover" }
          }
        ></div>
      </div>

      <div className="main_container raid_tools_cost_main_container">
        <div className="cost_description">raid cost (tool - hard side)</div>
        <div className="raid_cost_container">
          <div className="rocket_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${raidRgbThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>rocket</div>
                <div>{NumbersFormatter(rockets_cost)}</div>
              </div>
            </div>
          </div>
          <div className="explosives_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${explosivesRgbThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>C4</div>
                <div>{NumbersFormatter(explosives_cost)}</div>
              </div>
            </div>
          </div>
          <div className="ammo_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${ammoRgbThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>exp. 5.56</div>
                <div>{NumbersFormatter(ammo_cost)}</div>
              </div>
            </div>
          </div>
          <div className="satchel_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${satchelRgbThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>satchel</div>
                <div>{NumbersFormatter(satchel_cost)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_a">
        {/* <div className="cost_description">raid cost (resources)</div> */}
        <div className="misc_count_description">
          <label>
            <input type="checkbox" checked={count_sub_ingredients} onChange={HandleAdvancedResourceCountingState} />
            gunpowder + sub ingredients
          </label>
        </div>
        <div className="raid_cost_container">
          <div className="sulfur_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${sulfurThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>sulfur</div>
                <div>{NumbersFormatter(sulfur_cost)}</div>
              </div>
            </div>
          </div>
          <div
            className={!count_sub_ingredients ? "gunpowder_container main_container_inactive" : "gunpowder_container"}
          >
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${gunpowderThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>gunpowder</div>
                <div>{NumbersFormatter(gunpowder_cost)}</div>
              </div>
            </div>
          </div>
          <div className="charcoal_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${charcoalThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>charcoal</div>
                <div>{NumbersFormatter(charcoal_cost)}</div>
              </div>
            </div>
          </div>
          <div className="metal_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${metalThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>metal</div>
                <div>{NumbersFormatter(metal_fragments_cost)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_b">
        <div className="cost_description"></div>
        <div className="raid_cost_container">
          <div className="metal_pipe_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${metalPipeThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>metal pipe</div>
                <div>{NumbersFormatter(metal_pipe_cost)}</div>
              </div>
            </div>
          </div>
          <div className="lq_fuel_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${lqFuelThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>lq. fuel</div>
                <div>{NumbersFormatter(lq_fuel_cost)}</div>
              </div>
            </div>
          </div>
          <div className="cloth_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${clothThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>cloth</div>
                <div>{NumbersFormatter(cloth_cost)}</div>
              </div>
            </div>
          </div>
          <div className="tech_trash_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${techTrashThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>tech trash</div>
                <div>{NumbersFormatter(tech_trash_cost)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main_container raid_components_cost_main_container_c">
        <div className="cost_description"></div>
        <div className="raid_cost_container">
          <div className={!count_sub_ingredients ? "metal_container main_container_inactive" : "metal_container"}>
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${hqMetalThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>hq metal</div>
                <div>{NumbersFormatter(hq_metal_cost)}</div>
              </div>
            </div>
          </div>
          <div className={!count_sub_ingredients ? "scrap_container main_container_inactive" : "scrap_container"}>
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${scrapThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>scrap</div>
                <div>{NumbersFormatter(scrap_cost)}</div>
              </div>
            </div>
          </div>
          <div
            className={!count_sub_ingredients ? "animal_fat_container main_container_inactive" : "animal_fat_container"}
          >
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${animalFatThumbnail})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            >
              <div className="raid_cost_display">
                <div>animal fat</div>
                <div>{NumbersFormatter(animal_fat_cost)}</div>
              </div>
            </div>
          </div>
          <div className="rope_container">
            <div
              className="cost_cell"
              style={{
                backgroundImage: `url(${ropeThumbnail})`,
                backgroundSize: "cover",
              }}
            >
              <div className="raid_cost_display">
                <div>rope</div>
                <div>{NumbersFormatter(rope_cost)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="raid_reset_button" onClick={ResetRaid}>
        <FontAwesomeIcon icon={faArrowsRotate} size="3x" style={{ color: "#a8a8a8" }} />
      </div>

      <div className="raid_reset_button_descripton">reset raid</div>
    </>
  );
}
